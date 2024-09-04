import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import StarRatings from 'react-star-ratings';


//npm install react-star-ratings  리엑트에 있는 라이브러리
//npm install styled-components 




function Review({ temaNo }) {

    const [reviewList, setReviewList] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState('user01');
    useEffect(() => {
        
        axios.get(`/review/tema/${temaNo}`)
            .then((result) => {
                setReviewList(result.data);
            })
            .catch(() => {
                console.log("리뷰를 가지고 오는데 실패했습니다.")
            })
    }, [temaNo])
    console.log(reviewList);

    const reviewinsert = (e) => {
        e.preventDefault();
        axios.post("/review", {
            temaNo: temaNo,
            reviewContent: reviewContent,
            reviewRating: rating,
            userId: userId
                 })
                 .then((response) => {
                    setReviewList([...reviewList, response.data]);
                    setReviewContent(''); // 
                    setRating(0); // 
                })
                .catch(() => {
                    console.log("리뷰를 등록하는 데 실패했습니다.");
                });
            };

        return (
            <>
                <div>
                    <h3>후기 작성</h3>
                    <form onSubmit={reviewinsert}>
                        <div>
                            <StarRatings
                                rating={rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="50px"
                                starSpacing="3px"
                                changeRating={(newRating) => setRating(newRating)}
                            />
                        </div>
                        <div>
                            <textarea
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                placeholder="리뷰를 작성하세요"
                                rows="5"
                                cols="50"
                            />
                        </div>
                        <button type="submit">리뷰 등록</button>
                    </form>
                </div>

                {
                    reviewList.map((review) => {
                        return (
                            <div key={review.reviewNo}>
                                <span >{review.userId} </span>
                                <span>
                                    <StarRating rating={review.reviewRating} />
                                </span>
                                <p >{review.reviewContent}</p>
                                <p >작성일 : {review.reviewCreatedDate.slice(0, 10)}</p>
                            </div>
                        )
                    })
                }
            </>
        )
    }


const StarRating = ({ rating }) => {
    return (
        <StarRatings
            rating={rating}                     // 현재 별점 값
            starRatedColor="gold"               // 채워진 별의 색상
            numberOfStars={5}                   // 전체 별의 개수
            name="rating"                       // 별점 컴포넌트의 이름
            starDimension="24px"                // 각 별의 크기
            starSpacing="2px"                   // 별 사이의 간격
        />
    );
};


export default Review;