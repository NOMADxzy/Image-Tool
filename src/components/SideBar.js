import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {useEffect, useRef, useState} from 'react'
const HOST = 'http://localhost:5000/'
const { SubMenu } = Menu;
const SideBar = ({setContentMode,setRelative,setShowTagTitle,setTitle,setImages})=>{
    const [dirs,setDirs] = useState(['pics'])

    const handleClick = e => {
        let n = e.keyPath.length
        setTitle(e.keyPath[0])

        if(e.keyPath[n-1]==='文件夹'){
            let dir = dirs[e.keyPath[0]]
            setTitle(dir)
            fetch(HOST+'get_pics/'+dir)
                .then(res => res.json())
                .then(data => {
                    setShowTagTitle(false)
                    setImages(data.imgs);
                    setContentMode(0);
                })

                .catch(err => console.log(err));
        }else if(e.keyPath[n-1]==='所有照片'){//所有照片
            fetch(HOST+'get_all_pics')
                .then(res => res.json())
                .then(data => {
                    setShowTagTitle(false)
                  setContentMode(0);
                  setImages(data.imgs);
                })

                .catch(err => console.log(err));
        }else if(e.keyPath[n-1]==='清理'){
            let key = e.keyPath[0]
            switch (key){
                case '相似图片'://相似图片
                    fetch(HOST+'retrieval/cpt_all')
                        .then(res => res.json())
                        .then(data => {
                            // setShowTagTitle(false)
                            // setImages(data.imgs);
                            // setNum_per_row(7)
                            setRelative(data.relative)//相似图片数据
                            setContentMode(1)//相似图片渲染模式
                        })
                        .catch(err => console.log(err));
                    break;
                case '模糊图片':
                    fetch(HOST+'detect/blur_detect')
                        .then(res => res.json())
                        .then(data => {
                            // setShowTagTitle(false)
                            // setImages(data.imgs);
                            // setNum_per_row(7)
                            setImages(data.imgs)//图片数据
                            setContentMode(0)//通用图片渲染模式
                        })
                        .catch(err => console.log(err));
                    break;
                case '截图'://截图
                    fetch(HOST+'detect/screenshot')
                        .then(res => res.json())
                        .then(data => {
                            // setShowTagTitle(false)
                            // setImages(data.imgs);
                            // setNum_per_row(7)
                            setImages(data.imgs)//截图图片数据
                            setContentMode(0)//通用图片渲染模式
                        })
                        .catch(err => console.log(err));
                    break;
                case '大文件'://大文件
                    fetch(HOST+'detect/size_sort')
                        .then(res => res.json())
                        .then(data => {
                            // setShowTagTitle(false)
                            // setImages(data.imgs);
                            // setNum_per_row(7)
                            setImages(data.imgs)//截图图片数据
                            setContentMode(0)//通用图片渲染模式
                        })
                        .catch(err => console.log(err));
                    break
            }

        }
    };
    useEffect(()=>{
        fetch(HOST+'get_dirs')
            .then(res => res.json())
            .then(data => {
                setDirs(data.dirs)
            })
            .catch(err => console.log(err));
    },[])
    return (
        <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['所有照片']}
            defaultOpenKeys={['清理']}
            mode="inline"
            className={'top-20 fixed h-full'}
        >
            <Menu.Item key="所有照片">所有照片</Menu.Item>
            <SubMenu key="文件夹" icon={<MailOutlined />} title="文件夹">
                {dirs.map((value,key)=>{
                    return <Menu.Item key={key}>{value}</Menu.Item>
                })}
            </SubMenu>
            <SubMenu key="分类" icon={<AppstoreOutlined />} title="分类">

                <Menu.Item key="人物">人物</Menu.Item>
                <SubMenu key="事物" title="事物">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="清理" icon={<SettingOutlined />} title="清理">
                <Menu.Item key="相似图片">相似图片</Menu.Item>
                <Menu.Item key="模糊图片">模糊图片</Menu.Item>
                <Menu.Item key="截图">截图</Menu.Item>
              <Menu.Item key="大文件">大文件</Menu.Item>
                <Menu.Item key="缓存">缓存</Menu.Item>
            </SubMenu>
        </Menu>
    );
}
export default SideBar;