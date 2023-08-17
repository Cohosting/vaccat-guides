import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { SiReadthedocs } from 'react-icons/si';
import { ImBooks } from 'react-icons/im';
import { FiSettings } from 'react-icons/fi';
import { GrCatalog } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

export const MobileTab = () => {

    let iconSize = '20px';
    const location = useLocation()
    const parsed = queryString.parse(location.search);
    const navigate = useNavigate();
    const getActiveColor = (path) => {
        return location.pathname.includes(path)

    }
    return (
        <Flex py={3} borderTop={'1px solid #e4e4e4'}>
            {
                !(parsed.share === 'true') && (

                    <Flex justifySelf={'flex-start'} flex={1} flexDir={'column'} >
                        <Flex onClick={() => navigate('/properties')} cursor={'pointer'} color={!getActiveColor('properties') ? '#687183' : '#171A22'} flexDir={"column"} alignItems={'center'}>
                            <SiReadthedocs fontSize={iconSize} />
                            <Text mt={2}>Properties</Text>
                        </Flex>
                    </Flex>
                )
            }
            {
                !(parsed.share === 'true') && (

                    <Flex onClick={() => navigate('/catagories')} cursor={'pointer'} color={!getActiveColor('catagories') ? '#687183' : '#171A22'} flex={1} flexDir={'column'} alignItems={'center'}>
                        <GrCatalog fontSize={iconSize} />
                        <Text mt={2}>Catagories</Text>
                    </Flex>
                )
            }

            <Flex onClick={() => navigate('/guides')} cursor={'pointer'} color={!getActiveColor('guides') ? '#687183' : '#171A22'} flex={1} flexDir={'column'} alignItems={'center'}>
                <ImBooks fontSize={iconSize} />
                <Text mt={2}>Guides</Text>
            </Flex>
            {
                !(parsed.share === 'true') && (

                    <Flex onClick={() => navigate('/settings')} cursor={'pointer'} color={!getActiveColor('settings') ? '#687183' : '#171A22'} flex={1} flexDir={'column'} alignItems={'center'}>
                        <FiSettings fontSize={iconSize} />
                        <Text mt={2}>Settings</Text>
                    </Flex>
                )
            }

        </Flex>
    )
}
