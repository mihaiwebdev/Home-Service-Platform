import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
import Rating from '../components/Rating'
import "swiper/css";
import 'swiper/css/pagination';


const Reviews = ({reviews}) => {
    
    return (
        <Swiper
         className='w-full shadow border border-gray rounded-md'
         modules={[Pagination]}
         grabCursor={"creative"}
         pagination
        >
            {reviews && reviews.map(((review,idx) => (
                <SwiperSlide key={idx}>
                   <div className='flex flex-col'>
                        <div className='flex justify-between mx-6 border-b border-gray pt-4'>
                            <h4 className='text-xl font-semibold'>{review.author}</h4>
                            <div className='flex'>
                                <Rating value={review.rating} color={"#ffea00"}/>
                            </div>
                        </div>
                    </div>

                    <p className='mt-3 px-6 mb-8 text-sm'>{review.text}</p>
                    
                </SwiperSlide>
            )))}
        </Swiper>
    )
}

export default Reviews
