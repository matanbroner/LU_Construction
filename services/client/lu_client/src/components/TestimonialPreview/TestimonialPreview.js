import React from 'react'
import StarRatings from 'react-star-ratings';
import styles from './TestimonialPreview.css'


const TestimonialPreview = (props) =>{

    return(
        <div id="testimonialPreviewContent">
            <StarRatings
            starDimension='20px'
            starSpacing='2px'
            rating={props.rating}
            starRatedColor="#f6cd49"
            numberOfStars={5}
            name='rating'
            />
            <p>Review by: <strong>{props.name}</strong></p>
            <p>{(props.review).substring(0, 200) + (props.review.length > 200 ? '...' : null)}</p>
        </div>
    )
}

export default TestimonialPreview