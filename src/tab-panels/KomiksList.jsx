import {
    Tbody,
  } from '@chakra-ui/react';
import KomikItem from './KomikItem';

function KomiksList({komiks}){
    return(
        <Tbody>
            {komiks.map((komik) => 
            (<KomikItem 
            key={komik.ID}
            title={komik.Title}
            penulis={komik.Penulis}
            penerbit={komik.Penerbit}
            />)
            )}
        </Tbody>
    )
  }
export default KomiksList;