import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {Text, Avatar, Icon} from 'react-native-magnus';
import {DragSortableView, AutoDragSortableView} from 'react-native-drag-sort';
import {Button, Div, Modal, Input} from 'react-native-magnus';
const {width, height} = Dimensions.get('window');
const gestureRootViewStyle = {flex: 1};
const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 200;
const deleteHeight = 60;
import TodoCard from "../Components/TodoCard"
export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Make UX Changes',
      dueDate: '8th Aug',
      isCompleted: false,
    },
 
    {
      id: 3,
      task: 'Integrate Payment Gateway',
      dueDate: '7th Aug',
      isCompleted: true,
    },
  ]);
  const [deleteStatus, setDeleteStatus] = useState(0);
  const [activeItem, setActiveItem] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [taskidCounter, setTaskidCounter] = useState(4);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  // let deleteIndex=null
  //   const renderItem=({item,index})=>{
  //       return (
  //         <DraxView
  //         style={{flex: 1,height:50 }}
  //         draggingStyle={styles.dragging}
  //         dragReleasedStyle={styles.dragging}
  //         hoverDraggingStyle={styles.hoverDragging}
  //         dragPayload={item}
  //         longPressDelay={150}
  //         key={index}
  //       >

  //         <Text fontSize="4xl">{item.task}</Text>

  //       </DraxView>

  //       )
  //   }

  //   const snackBtn=({item, index})=>{
  //     return (

  //       );
  //   }
  useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [visible]);
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 60,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const renderItem = (item, index) => {
   if(!item.isCompleted){

   
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
        }else{
          return(<>
          <View style={{flexDirection:"row", display: 'flex'}}>
          <Div
        ml="sm"
        alignItems="center"
        justifyContent="center"
        p="xl"
        shadow="xs"
        bg="green500"
        style={{width:  75, zIndex: 99}}>
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
        style={{width: parentWidth - 32-75, zIndex: 99}}>
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
          
          
          </>)
        }
  };
  const onDragStart = item => {
    console.log('ITEM', item);
    setScrollEnabled(false);
    setActiveItem(tasks[item]);
    setDeleteStatus(1);
  };
  const fadeAnim = useRef(new Animated.Value(60)).current;
  const fadeBorder = useRef(new Animated.Value(30)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: width,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeBorder, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const onDragging = (gestureState, left, top) => {
    // if (this.isBuffer) return;
    console.log(
      gestureState.moveY + (StatusBar.currentHeight | 0) + deleteHeight,
    );

    if (
      gestureState.moveY + (StatusBar.currentHeight | 0) + deleteHeight >=
      height
    ) {
      // this.isBuffer = true;
      setDeleteStatus(2);
      //this.setState({deleteStatus: 2},() => {this.isBuffer = false})
    } else if (deleteStatus !== 1) {
      //  this.isBuffer = true;
      setDeleteStatus(1);
      // this.setState({deleteStatus: 1},() => {this.isBuffer = false})
    }
  };
  const addTodo = todoItem => {
    setTasks([...tasks, todoItem]);
  };
  const onDragEnd = (startIndex, endIndex) => {
    setScrollEnabled(true);
    console.log('START', startIndex, 'end', endIndex);
    if (deleteStatus === 2) {
      if (startIndex === endIndex) {
        const newData = [...tasks];
        newData.splice(startIndex, 1);
        setTasks(newData);
        setDeleteStatus(0);
        // this.setState({
        //     tasks: newData,
        //     deleteStatus: 0,
        // })
      } else {
        // const newData = [...tasks]
        // newData.splice(startIndex,1)
        // setTasks(newData)
        setDeleteIndex(startIndex);
        //   deleteIndex = endIndex;
        setDeleteStatus(0);

        // this.setState({
        //     deleteStatus: 0,
        // })
      }
    } else {
      setDeleteStatus(0);

      // this.setState({
      //     deleteStatus: 0,
      // })
    }
  };

  console.log(parentWidth);
  return (
    <SafeAreaView style={styles.outerView}>
      <View style={styles.headingContainer}>
        <View>
          <Text fontSize="4xl" fontWeight="bold">
            Hello Floyd Mullins
          </Text>
          <Text
            fontSize="xl"
            fontWeight="500"
            color="gray600"
            style={{marginTop: 10}}>
            You have {tasks.length} tasks
          </Text>
        </View>
        <View>
          <Avatar
            mt={0}
            size={64}
            source={{
              uri: 'https://flyingcdn-942385.b-cdn.net/wp-content/uploads/2020/06/Signs-of-a-Confident-Man-Banner1.jpg',
            }}
            shadow={1}
          />
        </View>
      </View>

      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={{paddingTop: 30, width: '100%', minHeight: height}}>
          <DragSortableView
            dataSource={tasks}
            parentWidth={parentWidth}
            isDragFreely={true}
            childrenWidth={parentWidth - 20}
            childrenHeight={120}
            onDragging={onDragging}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            // onClickItem={(items,item,idx)=>{
            //   let databkp=tasks
            //   databkp[idx].isCompleted=true
            //   setTasks(databkp)
            // }}
            onDataChange={data => {
              //console.log(data);
              setTasks(data);
              if (deleteIndex != null) {
                const deleteIndexbkp = deleteIndex;
                //deleteIndex = null;
                setDeleteIndex(null);
                let newData = [...data];
                newData = newData.filter(item => item.id != activeItem.id);
                //  newData.splice(deleteIndexbkp,1)
                setTasks(newData);
              } else if (data.length != tasks.length) {
                setTasks(data);
              }
            }}
            keyExtractor={(item, index) => item.task.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>

      {deleteStatus === 0 ? (
        <>
          <Button
            zIndex={99}
            bg="blue500"
            h={72}
            w={72}
            position="absolute"
            bottom={20}
            left={'40%'}
            rounded="circle"
            onPress={() => setVisible(true)}>
            <Icon name="plus" color="white" fontSize="4xl" fontWeight="bold" />
          </Button>
        </>
      ) : (
        <>
          {deleteStatus === 1 ? (
            <>
              <Button
                bg="red500"
                position="absolute"
                bottom={20}
                left={'40%'}
                zIndex={7}
                h={72}
                w={72}
                rounded="circle"
                onPress={() => console.log('btn')}>
                <Icon
                  name="delete"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                />
              </Button>
            </>
          ) : (
            <>
              <Button
                bg="red500"
                position="absolute"
                bottom={20}
                left={'38%'}
                zIndex={-1}
                h={86}
                w={86}
                rounded="circle"
                onPress={() => console.log('btn')}>
                <Icon
                  name="delete"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                />
              </Button>
            </>
          )}
        </>
      )}

      {/* <Text>Welcome Home</Text> */}
      <Modal isVisible={visible}>
        <View style={{flex: 1}}>
          <Button
            bg="white"
            h={45}
            w={45}
            position="absolute"
            top={10}
            left={4}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}>
            <Icon color="black" name="close" fontSize="4xl" fontWeight="bold" />
          </Button>
          <View style={{margin: 12, marginTop: 80}}>
            <TextInput
              placeholder="What would you like to add?"
              borderColor="white"
              style={{fontSize: 24}}
              autoFocus={true}
              value={todoText}
              onChangeText={setTodoText}
              // focusBorderColor="blue700"
              //suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'absolute',
              bottom: 80,
              right: 20,
            }}>
            <Icon
              color="gray"
              name="paperclip"
              fontSize="4xl"
              fontWeight="bold"
            />
            <Icon
              color="gray"
              name="calendar"
              fontSize="4xl"
              fontWeight="bold"
              style={{marginLeft: 20}}
            />
          </View>

          {/* <TouchableWithoutFeedback  onPress={() => {
              addTodo({
                id: taskidCounter,
                task: todoText,
                dueDate: '9th Aug',
                isCompleted: false,
              });
              setTaskidCounter(taskidCounter + 1);
              setVisible(false);
              setTodoText("");
            }}>
            <View style={styles.buttonContainer}>
              <Animated.View
                style={[
                  styles.fadingContainer,
                  {
                    backgroundColor:"#4299E1",
                    width: fadeAnim,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: fadeBorder,
                    position: 'absolute',
                    bottom: 0,
                  },
                ]}>
                <Text color="white" style={{textAlign: 'center'}} fontSize="6xl">
              {' '}
              +{' '}
            </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback> */}
          <TouchableWithoutFeedback
            // style={{
            //   display: 'flex',
            //   backgroundColor: '#4299E1',
            //   justifyContent: 'center',
            //   textAlign: 'center',
            // }}
            onPress={() => {
              addTodo({
                id: taskidCounter,
                task: todoText,
                dueDate: '9th Aug',
                isCompleted: false,
              });
              setTaskidCounter(taskidCounter + 1);
              setVisible(false);
              setTodoText('');
            }}>
            <View style={styles.buttonContainer}>
              <Animated.View
                style={[
                  styles.fadingContainer,
                  {
                    backgroundColor: '#4299E1',
                    // Bind opacity to animated value
                    width: fadeAnim,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: fadeBorder,
                    position: 'absolute',
                    bottom: 0,
                  },
                ]}>
                <Text
                  color="white"
                  style={{textAlign: 'center'}}
                  fontSize="6xl">
                  {' '}
                  +{' '}
                </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerView: {
    margin: 12,
    marginTop: 40,
    height: '100%',
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    // flex: 1,
    // backgroundColor:"#4299E1",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  fadingContainer: {
    padding: 10,
    backgroundColor: '#4299E1',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 25,
  },
});
