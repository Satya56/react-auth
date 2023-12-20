import { Button} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function SignOutButton({onSignOut}) {
  return <Button 
        color="red.500"
        onClick={() => onSignOut()}>
          <ArrowBackIcon/>
          Sign Out
        </Button>
  // return <button className='contact-item__delete' onClick={() => onDelete(id)}>X</button>
}
 
export default SignOutButton;