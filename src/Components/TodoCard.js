import React, {useState, useRef, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {Text, Icon} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
const {width, height} = Dimensions.get('window');
const gestureRootViewStyle = {flex: 1};
const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 200;
const deleteHeight = 60;
export default function TodoCard(props) {
  useEffect(() => {
    if (item != props.item) {
      setItem(props.item);
    }
  }, [props.item]);
  const [item, setItem] = useState(props.item);
  useEffect;
  if (!item.isCompleted) {
    return (
      <Div
        mx="sm"
        p="xl"
        shadow="xs"
        bg="white"
        style={{width: parentWidth - 32, zIndex: 99}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text color="black" fontWeight="500" fontSize="xl">
              {item.task}
            </Text>
            <Text color="grey" fontWeight="500" fontSize="md" mt={5}>
              Due by {item.dueDate}
            </Text>
          </View>
          <View>
            <Icon
              name="clockcircleo"
              color="black"
              fontSize="xl"
              fontWeight="bold"
            />
          </View>
        </View>
      </Div>
    );
  } else {
    return (
      <>
        <View style={{flexDirection: 'row', display: 'flex'}}>
          <Div
            ml="sm"
            alignItems="center"
            justifyContent="center"
            p="xl"
            shadow="xs"
            bg="green500"
            style={{width: 75, zIndex: 99}}>
            <Icon
              name="checkcircleo"
              color="white"
              fontSize="2xl"
              fontWeight="bold"
            />
          </Div>
          <Div
            mr="sm"
            p="xl"
            shadow="xs"
            bg="white"
            style={{width: parentWidth - 32 - 75, zIndex: 99}}>
            <View>
              <Text color="black" fontWeight="500" fontSize="xl">
                {item.task}
              </Text>
              <Text color="grey" fontWeight="500" fontSize="md" mt={5}>
                Due by {item.dueDate}
              </Text>
            </View>
          </Div>
        </View>
      </>
    );
  }
}
