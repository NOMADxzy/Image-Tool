import { useState } from "react";
import {Button,Input} from 'antd'



const ImageSearch = ( setTerm ) => {


    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        setTerm('person');
        e.preventDefault();
    }


    return (

        <div className='max-w-sm rounded overflow-hidden my-10 mx-auto px-4' id={'imagesearch'}>

            <form onSubmit={handleSubmit} action="" className="w-full max-w-sm">


                <div className="flex items-center border-b-2 border-teal-500 py-2">

                    <Input onChange={e => setText(e.target.value)} className="appearance-none bg-white border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"


                        type="text" placeholder="Search image term..." />

                    <Button type={"primary"} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 py-1 px-2 rounded text-white">Search</Button>


                </div>

            </form>

        </div>


    );
}

export default ImageSearch;