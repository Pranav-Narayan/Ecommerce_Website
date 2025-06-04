import './Hero.scss'
import Partner from '../Partner/Partner'
import Aboutus from '../Aboutus/Aboutus'

const Hero = () => {
    return (
        <>
            <div className='hero'>
                <div className="left">
                    <img src="./heroimage.png" alt="" />
                </div>
                <div className="right">
                    <div className="one">
                        <img src="./deliveryboy.jpg" alt="" />
                        <p>Free delivery worldWide</p>
                    </div>
                    <div className="two">
                        Mineral <br />Bath Salts
                    </div>
                    <div className="three">
                        Made for solo or partner soaks, this salt blend softens and rejuvenates all bodies. Filled with hand-harvested salt crystals from the Southern Dead.
                    </div>
                    <div className="four">
                        <button>buy now</button>
                        <button>Explore more</button>
                    </div>
                </div>
            </div>
            <Partner />
            <Aboutus />
        </>
    )
}

export default Hero