import axios from "axios";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

function AvgRating({ temaNo }) {
    const [avgRaing, setAvgRating] = useState(0);

    useEffect(()=>{
        axios.get(`/api/tema/${temaNo}/avgRating`)
             .then((result)=>{
                setAvgRating(result.data)
             })
             .catch(()=>{
                console.log("평점을 가지고오는데 실패했습니다")
             })
    },[temaNo])
    return(
    <div>
        <h4> 평점</h4>
        <StarRatings
            rating={avgRaing}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="2px"
        />
    </div>
    )
}

export default AvgRating;