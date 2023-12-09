import { Button} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function SignOutButton({onSignOut}) {
  return <Button 
        color="red.500"
        onClick={() => onSignOut()}>
          <DeleteIcon/>
        </Button>
  // return <button className='contact-item__delete' onClick={() => onDelete(id)}>X</button>
}
 
export default SignOutButton;