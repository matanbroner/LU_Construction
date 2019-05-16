import React from 'react'
import StarRatings from 'react-star-ratings';
import styles from './TestimonialPreview.css'


const TestimonialPreview = (props) =>{

    return(
        <div id="testimonialPreviewContent">
            <StarRatings
            starDimension='20px'
            starSpacing='2px'
            rating={props.item.rating}
            starRatedColor="#f6cd49"
            numberOfStars={5}
            name='rating'
            />
            <p>Review by: <strong>{props.item.name}</strong></p>
            <p>{(props.item.description).substring(0, 200) + (props.item.description.length > 200 ? '...' : '')}</p>
        </div>
    )
}

export default TestimonialPreview