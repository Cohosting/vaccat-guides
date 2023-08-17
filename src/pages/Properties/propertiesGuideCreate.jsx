import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useContext } from 'react';
import { GuideForm } from '../../components/guideForm';
import { propertyContext } from '../../context/property';
import Editor from '../guides/guidesEditor';
import { PropertyInput, subTextStyle } from './PropertyDetails';

export const PropertiesGuideCreate = ({ handleBack }) => {
    const { setAllGuides, allGuides, selectedGuides, setSelectedGuides, setShouldShowLayout } = useContext(propertyContext)
    const [guidesState, setGuidesState] = useState({
        name: '',
        descrription: '',
        catagory: ''
    });
    const [editorState, setEditorState] = useState({});

    const { name, descrription, catagory } = guidesState;



    const cb = (id, guide) => {

        setAllGuides([
            ...allGuides, guide
        ]);

        let newObj = { ...selectedGuides };
        guide.catagoryName.forEach((el) => {
            if (newObj[el]) {
                newObj[el] = [...newObj[el], guide.id]
            } else {
                newObj[el] = [guide.id]
            }
        });


        setSelectedGuides(newObj);
        setShouldShowLayout(true)






        handleBack()
    }
    return (
        <>
            <Box>
                <GuideForm onCancel={() => {
                    setShouldShowLayout(true)
                    handleBack()
                }} cb={cb} />
            </Box>
        </>

    )
}
