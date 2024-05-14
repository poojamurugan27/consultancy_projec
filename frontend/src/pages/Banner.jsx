import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../utils/products';

const Banner = () => {
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            showDots={true}
            slidesToSlide={1}
            customTransition="all .1"
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {bannerData.map((image) => (
                <Image src={'https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2FBanner_8_Desktop_.jpg&w=1920&q=75'} alt={image.alt} key={image._id} />
            ))}
            {bannerData.map((image) => (
                <Image src={'https://images-eu.ssl-images-amazon.com/images/G/31/img24/thomsoja/Grocery/SVD/Ingress_Mob.jpg'} alt={image.alt} key={image._id} />
            ))}
             {bannerData.map((image) => (
                <Image src={'https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2FBanner_3_Desktop_.jpg&w=1920&q=75'} alt={image.alt} key={image._id} />
            ))}
             {bannerData.map((image) => (
                <Image src={'https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2FBanner_7_Desktop_.jpg&w=1920&q=75'} alt={image.alt} key={image._id} />
            ))}
        </Carousel>
    );
}

export default Banner;


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 1064 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Image = styled('img')(({ theme }) => ({
    width: '95%',
    height: 380,
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 180,
    },
}));