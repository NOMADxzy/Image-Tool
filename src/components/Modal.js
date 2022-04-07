import { motion } from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react'
import ImageGallery from "../ImageGallery";
import '../image-gallery.scss'
import {notification,Button,Drawer,message,Tag} from 'antd'
import {getColor} from "../tools/general";

const HOST = 'http://localhost:5000/'
const Modal = ({ selectedImg, setSelectedImg,images,setImages }) => {
    const [visible, setVisible] = useState(false);
    const [candicateimgs,setcandicateimgs] = useState([['src','conf']]) //相似图片
    const [cur_idx,setCur_idx] = useState(selectedImg)
    const [detected,setDetected] = useState(false)
    const _imageGallery = useRef(null)

    const showDrawer = () => {
        fetch('http://localhost:5000/retrieval/', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({query:images[cur_idx].id}), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data.candicates)
                if(data.candicates!==undefined) setcandicateimgs(data.candicates)
            }).catch(err=>console.log(err))
        setVisible(true);

    };

    useEffect(()=>{
      if(visible){//显示了抽屉则每张都检索
            fetch('http://localhost:5000/retrieval/', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({query:images[cur_idx].id}), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data.candicates)
                    if(data.candicates!==undefined) setcandicateimgs(data.candicates)
                }).catch(err=>console.log(err))
        }
    },[cur_idx])

    const onClose = () => {
        setVisible(false);
    };
    const Delete = ()=>{
        fetch('http://localhost:5000/delete', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({paths:[images[cur_idx].id]}), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>{
                if(res.status===200) message.success("删除成功")
                images.splice(cur_idx,1)
                setImages(images)
                _imageGallery.current.update()
            }).catch(err=>console.log(err))
    }

    const handleTagClick=(relpath,tag,images)=>{//画box
        fetch(HOST+'detect/box_img', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({relpath:relpath,tag:tag}), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                images[cur_idx].original = data.box_img
                setImages(images)
                _imageGallery.current.update()
            }).catch(err=>console.log(err))
    }

    return (

      <div id={"fullimg"} className={'fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 backdrop z-20'}>
          <Drawer title={"算法共找到"+candicateimgs.length+"张相似结果"} placement="right" onClose={onClose}
                  mask={false} maskClosable={false} visible={visible}>
              {candicateimgs.map((value,key)=>{
                  return <img src={HOST+value[0]} alt={'img'}/>
              })}
          </Drawer>
          {/*<Button onClick={useDetect}>dianji</Button>*/}
        <ImageGallery startIndex={selectedImg}
                      showDrawer={showDrawer}
                      visible={visible}
                      renderCustomControls={  ()=> {
                        return <div className={'absolute z-10'}>
                            <Button className='image-gallery-custom-action mt-10' type={'primary'} shape={'round'} onClick={showDrawer}>查找相似</Button>
                            <Button className='image-gallery-custom-action -left-0' type={'primary'} shape={'round'} onClick={Delete}>删除</Button>
                            {images[cur_idx].tags.map((tag,key)=>
                                <Tag key={key} onClick={()=>handleTagClick(images[cur_idx].id,tag,images)}
                                     color={getColor()}>{tag}</Tag>)}
                        </div>
                      }}
                      setselectedImg={setSelectedImg}
                      setCur_idx={setCur_idx}
                      ref={_imageGallery}
                      thumbnailPosition={"right"}
                      items={images}/>
      </div>

    );
}


export default Modal;