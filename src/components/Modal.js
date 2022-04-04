import { motion } from 'framer-motion';
import {useEffect, useRef, useState} from 'react'
import ImageGallery from "../ImageGallery";
import '../image-gallery.scss'
import {notification,Button,Drawer,message} from 'antd'

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
      if(cur_idx<0) setCur_idx(images.length - 1)
      else if(cur_idx===images.length) setCur_idx(0)
      else if(visible){//显示了抽屉则每张都检索
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
            body: JSON.stringify({paths:[images[cur_idx].original]}), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res=>{
                if(res.status===200) message.success("删除成功")
            }).catch(err=>console.log(err))
    }

    return (

      <div id={"fullimg"} className={'fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 backdrop'}>
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
                        return <div>
                            <Button className='image-gallery-custom-action' onClick={showDrawer}>查找相似</Button>
                            <Button className='image-gallery-custom-action' onClick={Delete}>删除</Button>
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