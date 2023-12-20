import {
    Tr,
    Td  
  } from '@chakra-ui/react';

function KomikItem({title, penulis, penerbit}){
    return(
        <Tr>
            <Td>
                {title}
            </Td>
            <Td>
                {penulis}
            </Td>
            <Td>
                {penerbit}
            </Td>
        </Tr>
    )
}
export default KomikItem;