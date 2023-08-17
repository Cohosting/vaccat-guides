import { Box } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import EditorJS from '@editorjs/editorjs';
import edjsHTML from "editorjs-html";
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
const EDITTOR_HOLDER_ID = 'editorjs';



export const GuideContent = () => {
    const { id } = useParams();
    const [guideCont, setGuideCont] = useState()
    const edjsParser = edjsHTML();

    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: guideCont.content,
            autofocus: true,
            readOnly: true,
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
    useEffect(() => {

        (async () => {
            const ref = doc(db, 'guides', id);
            const snap = await getDoc(ref);
            const data = snap.data();
            setGuideCont(data)

        })();

        return () => {

        }
    }, []);
    useEffect(() => {
        if (!guideCont) return
        if (!ejInstance.current) {
            initEditor();
        }
        return () => {
            ejInstance.current?.destroy();
            ejInstance.current = null;
        }
    }, [guideCont]);

    return (
        <Box p={'20px'} fontFamily={'GTMedium'} >
            {JSON.stringify(guideCont)}
            <Box /* bg={'#eef5fa'}*/ p={'27px'} borderRadius={'6px'} >
                <Box boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'} className='content' bg={'#fff'} borderRadius={'4px'}  >
                    <div id={EDITTOR_HOLDER_ID}>
                    </div>
                </Box>
            </Box>
            {
                JSON.stringify(guideCont && edjsParser.parse(guideCont.content))
            }
        </Box>
    )
}
