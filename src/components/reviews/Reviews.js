import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from './reviewForm/ReviewForm';


import React from 'react'

const Reviews = () => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    },[])

    const addReview = async(e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/reviews", {reviewBody:rev.value, imdbId:movieId});

            const updateReviews = [...reviews, {body:rev.value}];
    
            rev.value = '';
    
            setReviews(updateReviews);
        }
        catch(err){
            console.log(err);

        }

       
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText= "What is your thoughts on the movie?"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>

                        </Row>
                    </>
                }
                {
                    reviews?.map((review) => {
                        return (
                            <>
                                <Row>
                                    <Col>{review.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
        
            </Col>

        </Row>
    </Container>
  )
}

export default Reviews