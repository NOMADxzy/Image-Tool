import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {useEffect, useRef, useState} from 'react'
const HOST = 'http://localhost:5000/'
const { SubMenu } = Menu;
const SideBar = ({setContentMode,setRelative,setShowTagTitle,setNum_per_row,setImages})=>{
    const [dirs,setDirs] = useState(['pics'])

    const handleClick = e => {
        let n = e.keyPath.length

        if(e.keyPath[n-1]==='文件夹'){
            let dir = dirs[e.keyPath[0]]
            fetch(HOST+'get_pics/'+dir)
                .then(res => res.json())
                .then(data => {
                    setShowTagTitle(false)
                    setImages(data.imgs);
                    setContentMode(0);
                })

                .catch(err => console.log(err));
        }else if(e.keyPath[n-1]==='-1'){//所有照片
            fetch(HOST+'get_all_pics')
                .then(res => res.json())
                .then(data => {
                    setShowTagTitle(false)
                  setContentMode(0);
                  setImages(data.imgs);
                })

                .catch(err => console.log(err));
        }else if(e.keyPath[n-1]==='清理'){
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
            defaultSelectedKeys={['-1']}
            defaultOpenKeys={['清理']}
            mode="inline"
        >
            <Menu.Item key="-1">所有照片</Menu.Item>
            <SubMenu key="文件夹" icon={<MailOutlined />} title="文件夹">
                {dirs.map((value,key)=>{
                    return <Menu.Item key={key}>{value}</Menu.Item>
                })}
            </SubMenu>
            <SubMenu key="分类" icon={<AppstoreOutlined />} title="分类">

                <Menu.Item key="5">人物</Menu.Item>
                <SubMenu key="sub3" title="事物">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="清理" icon={<SettingOutlined />} title="清理">
                <Menu.Item key="31">相似图片</Menu.Item>
                <Menu.Item key="32">模糊图片</Menu.Item>
                <Menu.Item key="33">截图</Menu.Item>
              <Menu.Item key="34">大文件</Menu.Item>
                <Menu.Item key="35">缓存</Menu.Item>
            </SubMenu>
        </Menu>
    );
}
export default SideBar;