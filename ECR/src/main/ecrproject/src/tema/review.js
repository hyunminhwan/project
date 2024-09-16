import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import StarRatings from 'react-star-ratings';
//npm install react-star-ratings  리엑트에 있는 라이브러리
//npm install styled-components 




function Review({ temaNo }) {

    const [reviewList, setReviewList] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0);
    const [userId] = useState('user01');
    const [reviewCount, setReviewCount] = useState(3);
    const loginToMember = useSelector((state) => state.loginMember);


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
            .then((r) => {
                axios.get(`/review/tema/${temaNo}`)
                    .then((result) => {
                        setReviewList(result.data);
                    })
                    .catch(() => {
                        console.log("리뷰를 가지고 오는데 실패했습니다.")
                    })
                setReviewContent('');  // 리뷰 내용 초기화
                setRating(0);          // 리뷰 평점 초기화
            })
            .catch(() => {
                console.log("리뷰를 등록이 실패했습니다.");
            });
    };

    const loadMore = (e) => {
        setReviewCount(e => e + 3);
    }


    const reviewDelete = (reviewNo) => {
        axios.delete(`/review/delete/${reviewNo}`)
            .then(() => {
                if (window.confirm("리뷰를 삭제하시겠습니다?")) {
                    alert("리뷰를 삭제하였습니다.");
                    axios.get(`/review/tema/${temaNo}`)
                        .then((result) => {
                            setReviewList(result.data);
                        })
                        .catch(() => {
                            console.log("리뷰를 가지고 오는데 실패했습니다.")
                        })
                } else {
                    alert("리뷰를 삭제를 취소하였습니다");
                }

            })
            .catch(() => {
                alert("리뷰삭제에 실패했습니다.")
            })
    }
    return (
        <>
            <hr />
            {loginToMember?.member ? (
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
            ) : (
                <h2>로그인 후 댓글을 등록하세요</h2>
            )
            }
            <hr />
            {
                reviewList.slice(0, reviewCount).map((review) => {
                    return (
                        <div key={review.reviewNo} >
                            <div >
                                <span >{review.userId}</span>
                                <StarRating rating={review.reviewRating} />
                            </div>

                            <p >{review.reviewContent}</p>

                            <div >
                                <span >작성일: {review.reviewCreatedDate.slice(0, 10)}</span>

                                {loginToMember.member?.memberId === review.userId && (
                                    <div >
                                        {/* <Button variant="outline-secondary" onClick={() => { }}>수정하기</Button>  잠시 보류*/}
                                        <Button variant="outline-danger" onClick={() => { reviewDelete(review.reviewNo) }}>삭제</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            }
            <Button onClick={loadMore} size="lg" variant="primary">더보기 {Math.min(reviewList.length, reviewCount)}/{reviewList.length}</Button>
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