import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import StarRatings from 'react-star-ratings';
import './reviewCss.css';

function Review({ temaNo }) {
    const [reviewList, setReviewList] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(3);
    const loginToMember = useSelector((state) => state.loginMember);
    const userId = loginToMember.member?.memberId || null;

    // 수정 
    const [editMode, setEditMode] = useState(null); // 현재 수정 중인 리뷰 번호
    const [editContent, setEditContent] = useState(''); // 수정 중인 리뷰 내용
    const [editRating, setEditRating] = useState(0); // 수정 중인 리뷰 평점



    const reviewCheck = reviewList.find(review => review.userId === userId);
    useEffect(() => {
        axios.get(`/review/tema/${temaNo}`)
            .then((result) => {
                setReviewList(result.data);
            })
            .catch(() => {
                console.log("리뷰를 가지고 오는데 실패했습니다.")
            })
    }, [temaNo]);

    //리뷰 등록
    const reviewinsert = (e) => {
        e.preventDefault();

        if (reviewCheck) {
            alert("이미 리뷰를 작성하셨습니다")
        } else {
            axios.post("/review/insert", {
                temaNo: temaNo,
                reviewContent: reviewContent,
                reviewRating: rating,
                userId: userId
            })
                .then((r) => {
                    alert("리뷰를 등록하였습니다.")
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
                    console.log("리뷰 등록에 실패했습니다.");
                });
        }
    };
    //리뷰 더보기
    const loadMore = () => {
        setReviewCount(e => e + 3);
    };

    //리뷰삭제
    const reviewDelete = (reviewNo) => {
        axios.delete(`/review/delete/${reviewNo}`)
            .then(() => {
                if (window.confirm("리뷰를 삭제하시겠습니까?")) {
                    alert("리뷰를 삭제하였습니다.");
                    axios.get(`/review/tema/${temaNo}`)
                        .then((result) => {
                            setReviewList(result.data);
                        })
                        .catch(() => {
                            console.log("리뷰를 가지고 오는데 실패했습니다.")
                        })
                } else {
                    alert("리뷰 삭제를 취소하였습니다.");
                }
            })
            .catch(() => {
                alert("리뷰 삭제에 실패했습니다.");
            });
    };

    // 수정 모드로 전환
    const EditModeOn = (review) => {
        setEditMode(review.reviewNo);
        setEditContent(review.reviewContent);
        setEditRating(review.reviewRating);
    };

    // 리뷰 수정
    const reviewEdit = (reviewNo) => {
        axios.put(`/review/edit/${reviewNo}`, {
            reviewContent: editContent,
            reviewRating: editRating
        })
            .then(() => {
                alert("리뷰를 수정하였습니다.");
                setEditMode(0); // 수정 모드 종료
                axios.get(`/review/tema/${temaNo}`)
                    .then((result) => {
                        setReviewList(result.data);
                    })
                    .catch(() => {
                        console.log("리뷰를 가지고 오는데 실패했습니다.")
                    });
            })
            .catch(() => {
                alert("리뷰 수정에 실패했습니다.");
            });
    };

    return (
        <>
            {loginToMember?.member ? (
                <div className="Review_Insert">
                    <form onSubmit={reviewinsert}>
                        <div className="Review_Ratings">
                            <StarRatings
                                rating={rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="50px"
                                starSpacing="3px"
                                changeRating={(newRating) => setRating(newRating)}
                            />
                        </div>
                        <div className="Review_Textarea">
                            <textarea
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                placeholder="리뷰를 작성하세요"
                                rows="5"
                                cols="50"
                            />
                        </div>
                        <br />
                        <button type="submit" className="Review_Submit">리뷰 등록</button>
                    </form>
                </div>
            ) : (
                <h2>로그인 후 댓글을 등록하세요</h2>
            )}
            <hr />
            {
                reviewList.slice(0, reviewCount).map((review) => {
                    return (
                        <div key={review.reviewNo} className="Review_List">
                            <div className="Review_Header">
                                <span>{review.userId}</span>
                                <StarRating rating={review.reviewRating} />
                            </div>
                            {editMode === review.reviewNo ? (
                                <div className="Review_Edit">
                                    <StarRatings
                                        rating={editRating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        starDimension="40px"
                                        starSpacing="3px"
                                        changeRating={(newRating) => setEditRating(newRating)}
                                    />
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows="5"
                                        cols="40"
                                    />
                                    <div className="Review_Button">
                                        <Button variant="outline-secondary" onClick={() => reviewEdit(review.reviewNo)}>저장</Button>
                                        <Button variant="outline-danger" onClick={() => setEditMode(0)}>취소</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="Review_Content">
                                    <p>{review.reviewContent}</p>
                                    <div className="Review_Footer">
                                        <span > 작성일 {review.reviewCreatedDate.slice(0, 10)}</span>
                                        <br /><br />
                                        {loginToMember.member?.memberId === review.userId && (
                                            <div className="Review_Button">
                                                <Button variant="outline-secondary" onClick={() => EditModeOn(review)}>수정하기</Button>
                                                <Button variant="outline-danger" onClick={() => reviewDelete(review.reviewNo)}>삭제</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            }
            <br /><br />
            <Button onClick={loadMore} size="lg" variant="primary">더보기 {Math.min(reviewList.length, reviewCount)}/{reviewList.length}</Button>
        </>
    );
}

const StarRating = ({ rating }) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="24px"
            starSpacing="2px"
        />
    );
};

export default Review;