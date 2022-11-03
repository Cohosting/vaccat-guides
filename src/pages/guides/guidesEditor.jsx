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


const DEFAULT_INITIAL_DATA = () => {
    return {
    }
}

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = (props) => {
    const ejInstance = useRef();
    const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

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

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await this.editorjs.saver.save();
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
                        endpoint: 'http://localhost:3001/fetchUrl', // Your backend endpoint for url data fetching,
                    },

                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:3001/uploadFile', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:3001/getImageUrl', // Your endpoint that provides uploading by Url
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

    return (
        <Box bg={'#eef5fa'} p={'50px'} borderRadius={'24px'} >
            <Box className='content' bg={'#fff'} boxShadow={'0 24px 24px -18px rgb(69 104 129 / 33%), 0 9px 45px 0 rgb(114 119 160 / 12%)'} >
                <div id={EDITTOR_HOLDER_ID}> </div>
            </Box>
        </Box>
    );
}

export default Editor;