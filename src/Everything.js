import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Aside from './components/Aside';
import { } from '@fortawesome/react-fontawesome'
import ImageGallery from "./ImageGallery";
import "antd/dist/antd.css";
import {Button, Slider, Select, Collapse, Image, Space, Card, Checkbox, PageHeader, message,Popconfirm} from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const Option = Select
const { Meta } = Card;

const FETCH_API = 'http://localhost:5000/get_pics/pics';
// const FETCH_API = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&image_type=photo&pretty=true`
const SEARCH_API = 'http://localhost:5000/search/'

function Everything() {

  const [images, setImages] = useState([]);
  const [title,setTitle] = useState('');
  const [edit,setEdit] = useState(false);
  const [relative,setRelative] = useState(null);
  const [contentMode,setContentMode] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [num_per_row,setNum_per_row]=useState(5)
    const [num_gap,setNum_gap]=useState(0)
  const [selectedImg, setSelectedImg] = useState(null);
  const [ShowtagTitle,setShowTagTitle] = useState(false)
    const [refresh,setRefresh] = useState(0);


  useEffect(() => {//搜索图片
    fetch(SEARCH_API+term)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setImages(data.imgs);
        setShowTagTitle(true)
        setIsLoading(false);
      })

      .catch(err => console.log(err));
  }, [term,refresh]);

  const handleKeyDown=(e)=>{
      if(e.keyCode===32) console.log('black')
  }
  document.addEventListener('keydown',handleKeyDown)

  const handleGroupCheck=(key)=>{
    let len = relative[key].length;
    let reverse = true
    for (let i = 0; i < len; i++) {//全选
      var boxs = document.getElementsByName(relative[key][i].index);
        for (let j = 0; j < boxs.length; j++) {
            if(!boxs[j].checked){
                boxs[j].click()
                reverse = false
            }
        }
    }
    if(reverse){//反选
      for (let i = 0; i < len; i++) {
          var boxs = document.getElementsByName(relative[key][i].index);
          for (let j = 0; j < boxs.length; j++) {
              boxs[j].click()
          }
      }
    }
  }
  const switchMode = (mode) => {
    var content;
    switch (mode) {
      case 0://一般图片列表模式
        content = <div className={"grid grid-cols-1 md:grid-cols-"+num_per_row+" gap-"+num_gap}>
          {images.map(image => (
            <ImageCard key={image.id} image={image} setSelectedImg={setSelectedImg} setTerm={setTerm} edit={edit}/>
          ))}
        </div>;
      break;
      case 1://相似图片模式
        content = <div>
          <Collapse defaultActiveKey={getlist(relative.length)} onChange={()=>console.log('collapse')}>
            {relative.map((img_group,key) => (
              <Panel header={<div>{"和"+img_group[0].id+"相似的"+img_group.length+"张相似图片"}
                <Checkbox className={'group_check'} onChange={e=>handleGroupCheck(key)}>全选</Checkbox></div>} key={key}>
                <Space size={'middle'}>
                  {img_group.map((image,innerkey)=>(
                    <div className={'img-group'}>
                      <p className={'img-tip-p'}>{innerkey!==0?"相似度"+Math.floor(image.score*10000)/100+'%':''}</p>
                        <ImageCard key={image.id} image={image} setSelectedImg={setSelectedImg} setTerm={setTerm}
                                   mode={contentMode} defaultchecked={image.checked} edit={true}/>
                    </div>
                  ))}
                </Space>
              </Panel>
            ))}
          </Collapse>
        </div>
    }
    return content;
  }
  const getlist=(i)=>{//用来初始展开collapse
    let list = []
    for (let j = 0; j < i; j++) {
      list.push(j)
    }
    return list
  }
  const Delete=()=> {
      let boxs = document.getElementsByClassName('ant-checkbox-input')
      let paths = []
      for (let i = boxs.length-1; i >=0 ; i--) {
          if (boxs[i].checked){
              let idx = boxs[i].name
              paths.push(images[idx].id)
              console.log(boxs[i].name);
              images.splice(idx,1)
          }
      }
      fetch('http://localhost:5000/delete', {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({paths:paths}), // data can be `string` or {object}!
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      })
          .then(res=>{
              if(res.status===200) message.success("删除"+paths.length+"张照片")
              setImages(images)
              setEdit(false);
              // setImages(images)
              setRefresh(refresh+1)
          }).catch(err=>console.log(err))
  }

  return (
    <div>
      <Navbar setTerm={setTerm}/>
        <div className={'left'}>
            {/*侧边栏*/}
          <SideBar setContentMode={setContentMode}
                   setRelative={setRelative}
                   setShowTagTitle={setShowTagTitle}
                   setNum_per_row={setNum_per_row}
                   setTitle={setTitle}
                   setImages={setImages}/>
        </div>
      <div className="container mx-auto mt-16" id={"right"}>
          <PageHeader //头部
              // ghost={false}
              onBack={() => setTerm('')}
              title={title}
              subTitle={term!=='' && ShowtagTitle ? term+`的相关结果`  : ''}
              extra={[
                  <Button size={"small"} key={2}>{contentMode===1?relative.length+'组照片':images.length+'张照片'}</Button>,
                  edit||contentMode===1?
                      <Popconfirm placement="topRight" title={'确定删除?'} onConfirm={Delete} okText="Yes" cancelText="No">
                          <Button size={'small'} key={'1'} danger={true} >删除</Button>
                      </Popconfirm>
                      :<Button type={'primary'} size={'small'} key={'1'} onClick={()=>setEdit(true)}>编辑</Button>,
                  <Select size={'small'} defaultValue='5列' style={{ width: 60 }} onChange={setNum_per_row}>
                      {[4,5,6,7,8,9,10,11,12].map((value,key)=>
                          <Option value={value}>{value+'列'}</Option>
                      )}
                  </Select>,
                  <Select size={'small'} defaultValue='间距0' style={{ width: 80 }} onChange={setNum_gap}>
                      {[0,1,2,3,4,5,6,7,8,9,10].map((value)=>
                          <Option value={value}>{'间距'+value}</Option>
                      )}
                  </Select>,
              ]}
          />

          {/*{term!=='' && ShowtagTitle ? <Button type={'link'} onClick={()=>setTerm('')}>x</Button>:''}*/}

        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No images found.</h1>}

        {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
          switchMode(contentMode)

        }
        {(selectedImg>0||selectedImg===0) && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} images={images} setImages={setImages}/>}

      </div>

      <Footer />
    </div>
  );
}

export default Everything;
