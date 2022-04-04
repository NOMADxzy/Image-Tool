import { motion } from 'framer-motion';


const ImageCard = ({ image, setSelectedImg,setTerm }) => {
    const tags = image.tags.length===0?['+addtag']:image.tags;

    const handleClick=(tag,event)=>{
        if(tag==='+addtag'){

        }else {
            setTerm(tag)
        }
        event.stopPropagation()
    }

    return (

        <div className="max-w-md rounded overflow-hidden shadow-lg mx-auto"
            onClick={() =>{ setSelectedImg(image.index);console.log(image.index)}}
        >
            <div className="opacity-80">

                <motion.img src={image.thumbnail} alt="" className="w-full opacity-80"
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 0.7 }}
                    // transition={{ delay: 1 }}
                    whileHover={{ opacity: 1 }}
                />

                <div className="px-1 py-4">

                    {tags.map((tag, index) => (

                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-0.5 my-0.5"
                        onClick={(e)=>{handleClick(tag,e)}}>
                            #{tag}

                        </span>

                    ))}

                </div>

            </div>


        </div>

    );
}

export default ImageCard;