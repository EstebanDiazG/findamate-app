import React, { useEffect } from 'react'

import {useRouter} from "next/router";

import { useTopic } from '@/store/hooks';
import TopicDetail from '@/components/functional/Topic/TopicDetail';


const TopicPage = () => {
  const router = useRouter();

  const {topicGetById} = useTopic();

  const {id} = router.query;

  useEffect(() => {
    if(id){
        topicGetById(id.toString());
    }
  }, [id])
  

  return <TopicDetail/>;
}

export default TopicPage;