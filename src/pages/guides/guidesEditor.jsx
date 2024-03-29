import { default as React, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { Box } from '@chakra-ui/react';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';



const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = ({ editorData, setEditorData }) => {
    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await editor.saver.save();
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            autofocus: true,
            tools: {
                header: {
                    class: Header,
                    /*  config: {
                         placeholder: 'Enter a header',
                         levels: [1, 2, 3, 4, 5, 6],
                         defaultLevel: 3
                     } */
                }, linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: `${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/fetchUrl`, // Your backend endpoint for url data fetching,
                    },

                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: `${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/uploadFile`, // Your backend file uploader endpoint
                            byUrl: `${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/getImageUrl`, // Your endpoint that provides uploading by Url
                        }
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },

                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+W',
                    config: {
                        titlePlaceholder: 'Title',
                        messagePlaceholder: 'Message',
                    },
                },

            },
        });
    };
    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
        }
        return () => {
            ejInstance.current?.destroy();
            ejInstance.current = null;
        }
    }, []);


    return (
        <Box /* bg={'#eef5fa'}*/ p={'27px'} borderRadius={'6px'} >
            <Box boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'} className='content' bg={'#fff'} borderRadius={'4px'}  >
                <div id={EDITTOR_HOLDER_ID}> </div>
            </Box>
        </Box>
    );
}

export default Editor;