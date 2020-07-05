import React from 'react'

import Page1 from './Page1Screen'
import Page2 from './Page2Screen'
import Page3 from './Page3Screen'
import Page4 from './Page4Screen'
import Page5 from './Page5Screen'
import Page6 from './Page6Screen'
import Page7 from './Page7Screen'
import Page8 from './Page8Screen'
import Page9 from './Page9Screen'
import Page10 from './Page10Screen'
import Page11 from './Page11Screen'
import Home from './HomeScreen'
import Media from './media'
import Search from './Search'
import Setting from './Setting'
import Notes from './Notes'
import ImageView from './ImageView'
import Edit from './Edit';
 
export const HomeScreen = ({navigation}) => <Home navigation={navigation} name="Home"/>
export const Page1Screen = ({navigation}) =><Page1 navigation={navigation} name="Introduction" />
export const Page2Screen = ({navigation}) =><Page2 navigation={navigation} name="The Legent of Garuda (Eagle)" />
export const Page3Screen = ({navigation}) =><Page3 navigation={navigation} name="The Legend of Hanuman (Monkey)" />
export const Page4Screen = ({navigation}) =><Page4 navigation={navigation} name="The Legend of Virabhadra (Warrior)" />
export const Page5Screen = ({navigation}) =><Page5 navigation={navigation} name="The Legend of Nataraj (Dancer)" />
export const Page6Screen = ({navigation}) =><Page6 navigation={navigation} name="The Legend of Matsyendra (Twist)" />
export const Page7Screen = ({navigation}) =><Page7 navigation={navigation} name="The Legend of Shiva, Kali and the Demon Raktabija" />
export const Page8Screen = ({navigation}) =><Page8 navigation={navigation} name="Acknowledgements" />
export const Page9Screen = ({navigation}) =><Page9 navigation={navigation} name="Credits" />
export const Page10Screen = ({navigation}) =><Page10 navigation={navigation} name="Contacts" />
export const Page11Screen = ({navigation}) =><Page11 navigation={navigation} name="Behind the Scenes" />
export const MediaScreen = ({navigation}) =><Media navigation={navigation} name="Media" />
export const SettingScreen = ({navigation}) =><Setting navigation={navigation} name="Setting" />
export const SearchScreen = ({navigation}) =><Search navigation={navigation} name="Search" />
export const NotesScreen = ({navigation}) =><Notes navigation={navigation} name="Notes" />
export const ImageViewScreen = ({navigation}) =><ImageView navigation={navigation} name="ImageView" />
export const EditScreen = ({navigation}) =><Edit navigation={navigation} name="Edit" />

