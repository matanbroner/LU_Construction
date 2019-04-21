const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uniqid = require('uniqid')
var authenticate = require('./auth')

const api = express.Router();

const Project = require('../models/Project')

AWS.config.update({
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY_ID,
  secretAccessKey: process.env.DO_SPACE_ACCESS_KEY,
});

const spacesEndpoint = new AWS.Endpoint(process.env.DO_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: function (req, file, cb) {
        const bucketName = `${process.env.DO_SPACE_NAME}/` + req.params.id
        cb(null, bucketName)
    },
    acl: 'public-read',
    // eslint-disable-next-line
    key: function (req, file, cb) {
        let fileId = uniqid()
        cb(null, fileId);
    },
  }),
}).array('upload', 50);



// GET DATABASE OBJECT FOR A PROJECT
api.get('/:id', (req, res, next) => {
    Project.findOne({projectId: req.params.id}, (err, project) => {
        if (err || !project) return res.status(404)
        res.send(project)
    })
})

// UPDATE INFORMATION FOR A PROJECT (NOT PHOTOS)
api.post('/modify/:id', (req, res, next) => {
    authenticate(req, res , (r) => { 
        if (!r) 
        return res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
        else {
                var projectInfo = req.body.projectInfo
                Project.findOneAndUpdate({projectId: req.params.id}, projectInfo, (err, result) => {
                    if (err)
                        return res.status(404)
                    if (!result){
                    var newProject = new Project({
                        projectId: projectInfo.projectId,
                        projectName: projectInfo.projectName,
                        projectLocation: projectInfo.projectLocation,
                        projectDescription: projectInfo.projectDescription,
                        createDate: projectInfo.createDate,
                        bucketId: projectInfo.projectId,
                        mediaCount: projectInfo.mediaCount,
                        coverImage: projectInfo.coverPhotoUrl,
                        youtubeLinks: projectInfo.youtubeLinks ? [].concat(projectInfo.youtubeLinks) : [],
                        priceMin: projectInfo.priceMin ? projectInfo.priceMin : 0,
                        priceMax: projectInfo.priceMax ? projectInfo.priceMax : 0,
                        featured: projectInfo.featured
                    })
                    newProject.save(function(err){
                        if (err) {
                            console.log(err)
                            return res.status(404).json({saveErr: "Error saving project."})
                        }
                        else return res.status(200)
                    })
                }
            })
        }
    })
})

// GET ALL PHOTO LINKS FOR A PROJECT
api.get('/photos/get/:id', (req, res, next) => {
    var params = {
        Bucket: process.env.DO_SPACE_NAME,
    };

    let photos = []
    let url = process.env.DO_EDGE_URL
    s3.listObjectsV2(params, function(err, data){
        if(err)
            return res.status(404).json({ errors: err })
        data.Contents.forEach(obj => {
            if (obj.Key.startsWith(req.params.id))
                photos.push(
                    {
                        key: obj.Key,
                        url: url + obj.Key
                    }
                )
        })
        res.json(photos)
    })
})

// ADD PHOTOS TO A PROJECT
api.post('/photos/add/:id', (req, res, next) => {
    authenticate(req, res , (r) => { 
        if (!r) 
        res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
        else {
            upload(req, res, err => {
                if (err) {
                    return res.status(404).json({ errors: err });
                }
                else return res.status(200).json({upload: "Upload succesful."})
            })
        }
    })
})

// REMOVE PHOTOS FROM A PROJECT
api.post('/photos/delete/:id', (req, res, next) => {

    authenticate(req, res , (r) => { 
        if (!r) 
        res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
    })

    let keys = req.body.keys
    let Delete = {
        Objects: keys.map(key => {return {Key: key}})
    }
    let deleteParams = {
        Bucket: process.env.DO_SPACE_NAME,
        Delete: Delete
    }
    s3.deleteObjects(deleteParams, function (err, data) {
        if (!err) {
            res.status(200).json(data); // sucessfull response
        } else {
            res.status(404); // an error ocurred
        }
    });

})

// DELETE A PROJECT AND ALL OF ITS PHOTOS
api.post('/delete/:id', (req, res, next) => {

    authenticate(req, res , (r) => { 
        if (!r) 
         res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
    })

    let keys = []
    let params = {
        Bucket: process.env.DO_SPACE_NAME,
        Prefix: `${req.params.id}/`
    }
    s3.listObjectsV2(params, function(err, data){
        if(err)
            return res.status(404) 
        data.Contents.forEach(obj => {
            keys.push({
                Key: obj.Key
                })
            })
            
           
            let Delete = {
                Objects: keys
            }
            let deleteParams = {
                Bucket: process.env.DO_SPACE_NAME,
                Delete: Delete
            }
            s3.deleteObjects(deleteParams, function (err, data) {
                if (!err) {
                    Project.findOneAndDelete({projectId: req.params.id}, err => {
                        if (err)
                             return res.status(404) 
                        else return res.status(200); // sucessfull response
                    })
                    return res.status(200)
                } else {
                     return res.status(404); // an error ocurred
                }
            });

        })
        res.status(200).json({deleted: "Project and all photos were deleted."})
    })

module.exports = api;