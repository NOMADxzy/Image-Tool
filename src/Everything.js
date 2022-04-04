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
import {Button, Slider,Select,Collapse,Image,Space,Card,Checkbox} from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const Option = Select
const { Meta } = Card;

const FETCH_API = 'http://localhost:5000/get_pics/pics';
// const FETCH_API = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&image_type=photo&pretty=true`
const SEARCH_API = 'http://localhost:5000/search/'

function Everything() {

  const [images, setImages] = useState([]);
  const [checked,setChecked] = useState([])
  const [relative,setRelative] = useState(null);
  const [contentMode,setContentMode] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [num_per_row,setNum_per_row]=useState(5)
    const [num_gap,setNum_gap]=useState(0)
  const [selectedImg, setSelectedImg] = useState(null);
  const [ShowtagTitle,setShowTagTitle] = useState(false)


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
  }, [term]);

  const handleKeyDown=(e)=>{
      if(e.keyCode===32) console.log('black')
  }
  document.addEventListener('keydown',handleKeyDown)
  const initialChecked=()=>{
    for (let ig in relative) {
      for (let i = 1; i < ig.length; i++) {
        console.log('1')
        checked.push(ig[i])
      }
    }
    setChecked(checked)
  }
  useEffect(()=>{
    if(relative){
      for (let ig=0; ig < relative.length;ig++) {
        let group = relative[ig]
        for (let i = 1; i < group.length; i++) {
          checked.push(group[i].original)
        }
      }
      setChecked(checked)
    }
  },[relative])

  const handleCheck = (key,index)=>{
    let webpath = relative[key][index].original
    let idx = checked.indexOf(webpath)

    let before_class = document.getElementById(get_rela_id('img',key,index)).className
    document.getElementById(get_rela_id('img',key,index)).className = before_class=='rela_img'?'rela_img_checked':'rela_img'
    if(idx>-1){
      checked.splice(idx,1)
    }else {
      checked.push(webpath)
    }
    setChecked(checked)
  }
  const get_rela_id=(prefix,key,index)=>{
    let base = 0
    for (let i = 0; i < key; i++) {
      base += relative[i].length
    }
    base += index
    return prefix+base.toString()
  }
  const handleGroupCheck=(key,event)=>{
    let len = relative[key].length;
    let reverse = true
    for (let i = 0; i < len; i++) {
      var the_checkbox = document.getElementById(get_rela_id('checkbox',key,i))
      if(!the_checkbox.checked){
        the_checkbox.click()
        reverse = false
      }
    }
    if(reverse){
      for (let i = 0; i < len; i++) {
        document.getElementById(get_rela_id('checkbox',key,i)).click()
      }
    }
    event.stopPropagation()
  }
  const switchMode = (mode) => {
    var content;
    switch (mode) {
      case 0://一般图片列表模式
        content = <div className={"grid grid-cols-1 md:grid-cols-"+num_per_row+" gap-"+num_gap}>
          {images.map(image => (
            <ImageCard key={image.id} image={image} setSelectedImg={setSelectedImg} setTerm={setTerm}/>
          ))}
        </div>;
      break;
      case 1://相似图片模式
        content = <div>
          <Button onClick={()=>console.log(checked)}>删除</Button>
          <Collapse defaultActiveKey={getlist(relative.length)} onChange={()=>console.log('collapse')}>
            {relative.map((img_group,key) => (
              <Panel header={<div>{"和"+img_group[0].id+"相似的"+img_group.length+"张相似图片"}
                <Checkbox className={'group_check'} onChange={e=>handleGroupCheck(key,e)}>全选</Checkbox></div>} key={key}>
                <Space size={'middle'}>
                  {img_group.map(image=>(
                    <div className={'img-group'}>
                      <Checkbox id={get_rela_id('checkbox',key,image.index)} className={'img-tip'} defaultChecked={image.checked} onChange={()=>{handleCheck(key,image.index)}}></Checkbox>
                      <p className={'img-tip-p'}>{image.index!==0?"相似度"+Math.floor(image.score*10000)/100+'%':''}</p>
                      <img id={get_rela_id('img',key,image.index)} className={image.checked?'rela_img_checked':'rela_img'} width={200} src={image.original}/>
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
  const getlist=(i)=>{
    let list = []
    for (let j = 0; j < i; j++) {
      list.push(j)
    }
    return list
  }

  return (
    <div>
      <Navbar setTerm={setTerm}/>
        <div className={'left'}>
          <SideBar setContentMode={setContentMode}
                   setRelative={setRelative}
                   setShowTagTitle={setShowTagTitle}
                   setNum_per_row={setNum_per_row}
                   setImages={setImages}/>
        </div>
      <div className="container mx-auto" id={"right"}>
          <span id={'slider'}><Slider defaultValue={5} dots={true} min={4} max={12} onChange={setNum_per_row}/></span>
          <Slider defaultValue={0} min={0} max={10} onChange={setNum_gap}/>
          {/*<Select defaultValue="lucy" style={{ width: 120 }} onChange={setNum_per_row}>*/}
          {/*    <Option value="jack">Jack</Option>*/}
          {/*    <Option value="lucy">Lucy</Option>*/}
          {/*    <Option value="disabled" disabled>*/}
          {/*        Disabled*/}
          {/*    </Option>*/}
          {/*    <Option value="Yiminghe">yiminghe</Option>*/}
          {/*</Select>*/}
          {/*{true?{term'的相关结果'}}*/}
          {term!=='' && ShowtagTitle ? term+`的相关结果`  : ''}
          {term!=='' && ShowtagTitle ? <Button type={'link'} onClick={()=>setTerm('')}>x</Button>:''}
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
