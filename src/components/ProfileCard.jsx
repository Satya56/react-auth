import React from 'react';
import {Heading, Text, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react';
import SignOutButton from './SignOutButton';

function ProfileCard({name, email, onSignOut}){
    return(
        <Card>
            <CardHeader>
                <Heading size='md'>{name}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{email}</Text>
            </CardBody>
            <CardFooter>
                <SignOutButton onSignOut={onSignOut}/>
            </CardFooter>
        </Card>
    );
}

export default ProfileCard;
