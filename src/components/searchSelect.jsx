import React, { useState } from 'react';
import { Box, Button, Checkbox, Flex, InputGroup, InputLeftElement, Text, Input, Image } from '@chakra-ui/react'

import { AiOutlineSearch } from 'react-icons/ai'

export const SearchSelect = ({ onSelectAll, isLoaded, onClearAll, onSelect, items, selectedItems = [], label, children }) => {
    const [searchText, setSearchText] = useState('');
    let searchSelectContainer = {
        border: '1px solid #e9e9e9',
        p: '20px',
        borderRadius: '12px'
    }
    const getIsChecked = (el) => {
        if (selectedItems.length > 0 && typeof selectedItems[0] === 'object' && selectedItems[0] !== null) {
            return selectedItems.filter((el1) => el1.id === el.id).length === 1
        } else {
            return selectedItems.includes(el.id)
        }

    }
    return (
        <Box sx={searchSelectContainer}>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Box>
                    <Checkbox onChange={(e) => e.target.checked ? onSelectAll() : onClearAll()} colorScheme='green' isChecked={isLoaded && (items.length !== 0 || selectedItems.length !== 0) && items.length === selectedItems.length}>
                        <Text fontWeight={'600'} fontSize={'17px'} >{label ? label : "All properties"}</Text>
                    </Checkbox>

                </Box>
                <Flex alignItems={'center'}>
                    <Text fontWeight={500}>{selectedItems.length} selected</Text>
                    <Button pl={'10px'} variant={'ghost'} color={'#37de37'} cursor={'pointer'} onClick={onClearAll} >Clear  selection</Button>
                </Flex>
            </Flex>

            <InputGroup mt={3}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineSearch />}
                />
                <Input type='text' placeholder='Search' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </InputGroup>

            <Box mt={5}>
                {
                    items.filter((el) => el?.name?.toLowerCase().includes(searchText.toLowerCase())).map((el) => (
                        /* selectedItems.id ? true : selectedItems.includes(el.id) */
                        <Flex alignItems={'center'} mb={2} >

                            <Checkbox isChecked={getIsChecked(el)} colorScheme='green' onChange={(e) => onSelect(e.target.checked, el)} >
                                <Flex alignItems={'center'} ml={3} >
                                    {
                                        el.coverPhoto && (
                                            <Image borderRadius={'4px'} src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' w={'30px'} height={'30px'} />
                                        )
                                    }
                                    <Text ml={2}>{el.title ? el.title : el.name}</Text>
                                </Flex>
                            </Checkbox>
                        </Flex>
                    ))
                }



            </Box>

            {
                children
            }

        </Box>
    )
}
