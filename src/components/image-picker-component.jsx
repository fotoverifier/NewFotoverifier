"use client";
import { useState,useRef } from 'react';
import { useAppContext } from '@/components/context-component';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const ImagePicker = ({isModal=false, onClose = null})=>{
     // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
      
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
        
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
        }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files);
        }
    };
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    function handleFiles(files) {
        if (files.length > 0)
        setImage(URL.createObjectURL(files[0]))
    }
    const [image, setImage] = useState(null)

    const [url, setUrl] = useState("")
    const onUrlChange = (e)=>{
        setUrl(e.target.value)
    }
    const analyzeClick = (isUrl)=>{
        if (isUrl && url!==""){
        setGlobalImage(url);
        router.push('/tools/metadata-analysis')
        }
        else
        if(image){
            setGlobalImage(image);
            router.push('/tools/metadata-analysis');
        }
            
    }
    const router = useRouter();
    
    const {globalImage, setGlobalImage} = useAppContext()
    return(<div className={'p-[2vw] ' + (isModal?" modal ":"")}>
            {
                isModal?
                <div className='flex flex-row justify-end w-full'>
                    <button onClick={()=>onClose()} >x</button>
                </div>
                :null
            }
           
         
            <div  className='flex flex-row justify-center relative h-[60vh] w-full '>
               
            <form className={'w-full ' + (!dragActive ? "" : "drag-active")} id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                 <input ref={inputRef} accept="image/*" type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className='h-full'>
           
              </label>
             
              <div className='flex flex-col justify-center w-full absolute top-[20%]  h-[70%]'>
                <div className='flex flex-row justify-center w-full mb-[5%] relative h-[100%]'>
                  <div className='h-[100%] 'onClick={onButtonClick}  >
                    <Image 
                      alt="Plus.svg" 
                      priority 
                      layout='fill'
                      objectFit='contain'
                      className='opacity-80 top-0 '
                      src={image?image:'/Plus.svg'}/>
                  </div>
                </div>
                <div className='flex flex-row justify-center mb-[5%] mt-[2%]'>
                  <div className='text-[1vw] opacity-50'>Drag or click to open picture to start verifying</div>
                    
                </div>
                <div className='flex flex-row justify-center'>
                  <div onClick={onButtonClick} className='text-[1vw] flex flex-row justify-center home-btn rounded-md w-[12vw] h-[7vh] mx-[1vw]'>
                      <Image 
                        width={25} 
                        
                        alt="UploadPicture.svg" 
                        priority 
                        height={25} 
                        className=''
                        src='/UploadPicture.svg'/>
                      <div className='flex flex-col justify-center text-[1vw] ml-[0.5vw] font-bold'>
                        Open picture 
                      </div>
                  </div>
                  <div onClick={()=>analyzeClick(false)} className={'text-[1vw] flex flex-row justify-center home-btn rounded-md w-[10vw] h-[7vh] mx-[1vw] ' + (image? "" : "inactive")}>
                      <Image 
                        width={25} 
                        alt="Analyze.svg" 
                        priority 
                        height={25} 
                        className=''
                        src='/Analyze.svg'/>
                      <div className='flex flex-col justify-center text-[1vw] ml-[0.5vw] font-bold'>
                        Analyze 
                      </div>
                  </div>
                </div>
                
                
              </div>
              { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
        </div>
        <div className='flex flex-row justify-center text-[3vw] font-bold m-[2vh]'>
            <div className='flex flex-row justify-center'>
              <div className='text-[1.2vw] font-bold'>Or</div>
            </div>
        </div>
        <div className='flex flex-row justify-center text-[3vw] font-bold m-[2vh]'>
          <div className='flex flex-row justify-center m-[0]'>
              <div className='text-[1vw] flex flex-row justify-center rounded-l-md h-[7vh] border-l-[0.2vw]
              border-t-[0.2vw] border-b-[0.2vw] url-input'>
                  <input type='text' placeholder='Type the image URL' value={url} className='url-input w-[35vw] bg-transparent p-[2%]' onChange={onUrlChange}/>
              </div>
              <div className={'text-[1vw] flex flex-row justify-center home-btn rounded-r-md w-[10vw] h-[7vh] ' +  (url === ""? "inactive" : "")}>
                    <Image 
                      width={25} 
                      alt="Analyze.svg" 
                      priority 
                      height={25} 
                      className=''
                      src='/Analyze.svg'/>
                    <div onClick={()=>analyzeClick(true)} className='flex flex-col justify-center text-[1vw] ml-[0.5vw] font-bold' >
                      Analyze 
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        
    )
}
export default ImagePicker;