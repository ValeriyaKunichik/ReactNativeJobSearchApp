import React from 'react'

import styles from './nearbyjobs.style'

import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";


import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("Search", {
    SearchQuery: "React developer",
  });
  //console.log(data)
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.id}`}
              handleNavigate={() => router.push({pathname:`/job-details/${job.id}`, params: {title: job.title, company:job.company, url:job.url.slice(6,)}})}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;