import { motion } from 'framer-motion';
import {Checkbox, Button, Menu, Dropdown, message} from 'antd'
import { FullscreenOutlined } from '@ant-design/icons';


const ImageCard = ({ image, setSelectedImg,setTerm ,mode,defaultchecked,edit,setSimpleImg,update}) => {
    const tags = image.tags.length===0?['+addtag']:image.tags;

    const menu = (
        <Menu>
            <Menu.Item key="1"><p className={'text-red-500'}>删除</p></Menu.Item>
            <Menu.Item key="2" onClick={(e)=>{setSelectedImg(image.index)}}>播放</Menu.Item>
        </Menu>
    );

    const handleClick=(tag,event)=>{
        if(tag==='+addtag'){

        }else {
            setTerm(tag)
        }
        event.stopPropagation()
    }
    const Delete=()=>{
        fetch('http://localhost:5000/delete', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({paths:[image.id]}), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>{
                if(res.status===200) message.success("删除成功")
                update();
            }).catch(err=>console.log(err))
    }
    const check_or_watch=(e,index)=>{
        if(e.target.className!=='ant-checkbox-input') {
            if(e.target.tagName==='IMG') setSimpleImg(image.original);
        }
    }

    return (

        <div className="max-w-md rounded overflow-hidden shadow-lg mx-auto"
            onClick={(e) =>{check_or_watch(e,image.index)}}
        >
                <Dropdown overlay={menu} trigger={['contextMenu']} className={'opacity-80'}>
                    <div className={'img-group'}>
                    <span className={edit?'':'hidden'}>
                        <Checkbox name={image.index} className={'img-tip'} defaultChecked={defaultchecked}
                                  key={image.index}/>
                    </span>
                        <motion.img src={image.thumbnail} alt="" className="w-full opacity-80"
                            // initial={{ opacity: 0 }}
                            // animate={{ opacity: 0.7 }}
                            // transition={{ delay: 1 }}
                                    whileHover={{ opacity: 1 }}
                        />
                    </div>
                </Dropdown>

                {(mode!==1) && <div className="px-1 py-4 cursor-pointer">

                    {tags.map((tag, index) => (

                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-0.5 my-0.5 hover:text-blue-400"
                        onClick={(e)=>{handleClick(tag,e)}}>
                            #{tag}

                        </span>

                    ))}

                </div>}



        </div>

    );
}

export default ImageCard;