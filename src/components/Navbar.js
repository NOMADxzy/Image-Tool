import { useState } from "react";
import '../assets/style.css';
import ImageSearch from "./ImageSearch";
import {Button} from 'antd'

import logo from '../pixy-logo-white.svg';

import { motion, AnimatePresence } from "framer-motion";
import { Upload, message} from 'antd';

const props = {//导入文件夹逻辑
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // beforeUpload:(file,filelist)=>{//获取文件夹路径，停止上传
    //     console.log(file)
    //     console.log(filelist)
    //     return false
    // },
    customRequest:(options)=>{
        const { data,filename,headers, file, onProgress } = options;
        console.log(data)
        console.log(filename)
        console.log(headers)
        console.log(1)
    },
    showUploadList:false,
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


const menu = {


    hidden: {

        // y: -"100vh",
        overflow: "hidden",
        height: "0px",
        opacity: 0
        // transition: { delay: 0.5 }

    },

    visible: {

        // y: "150px",
        height: "200px",
        opacity: 1


    }

}
const Navbar = (setTerm) => {
    const importDir=()=>{
    }
    const [isOpen, setIsOpen] = useState(false);


    const handleNavCollapse = () => {
        setIsOpen(!isOpen);
        console.log("button clicked");
        console.log(isOpen);
    }

    return (

        <div className="bg-custom-light mt-0" id={"header"}>
            <div className="container mx-auto mt-0 bg-custom-light text-white">

                <nav className="flex flex-wrap items-center justify-between p-5 bg-custom-light text-white">

                    {/* logo */}

                    <div className="flex items-center">

                        <img src={logo} alt="LOGO" width="150" />
                        {/* <h1 className="font-bold text-3xl ml-2">PIXY</h1> */}

                    </div>
                  <ImageSearch  setTerm={setTerm}/>



                    {/* hamburger menu */}

                    <div className="flex md:hidden">

                        {/* toggler button */}



                        <Button onClick={handleNavCollapse} id="hamburger">
                            <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
                            <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
                        </Button>



                    </div>



                    {/* links */}


                    <ul className="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
                        <li><a href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">设置</a></li>
                        <li><Upload {...props} directory={true}><a onClick={importDir} href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">导入</a></Upload></li>
                        <li><a href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">一键清理</a></li>
                    </ul>
                </nav>

                <AnimatePresence>
                    {isOpen && (

                        <motion.div

                            variants={menu}

                            initial="hidden"
                            animate="visible"
                            exit="hidden"



                        >

                            <ul className="px-4">


                                <li><a href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white md:border-none">导入</a></li>
                                <li><a href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-white md:border-none">设置</a></li>


                            </ul>


                        </motion.div>

                    )}



                </AnimatePresence>








            </div >


        </div>







    );
}


export default Navbar;