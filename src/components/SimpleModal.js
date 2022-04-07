import { motion } from 'framer-motion';

const SimpleModal = ({ simpleImg, setSimpleImg }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSimpleImg(null);
        }
    }
    return (

        <motion.div onClick={handleClick} className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 backdrop z-30"

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
        >
            <motion.img className="block max-w-screen-lg h-full  m-auto shadow border-2 border-white" src={simpleImg} alt="enlarged pic"

                        initial={{ y: "-100vh" }}
                        animate={{ y: 0 }}
            />
        </motion.div>
    );
}

export default SimpleModal;