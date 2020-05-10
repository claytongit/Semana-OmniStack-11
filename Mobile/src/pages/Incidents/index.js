import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';

import Logo from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    function navigationDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);


        const response = await api.get('incidents', { params: { page } });

        setIncidents([ ...incidents, ...response.data ]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect( () => {
        loadIncidents();
    }, [] );

    return(
        <View style={ styles.container } >
            <View style={ styles.header }>
                <Image source={ Logo } />
                <Text style={ styles.headerText }>
                    Total de <Text style={ styles.headerTextBold }>{ total } casos.</Text>
                </Text>
            </View>

            <Text style={ styles.title }>Bem-Vindo!</Text>
            <Text style={ styles.description }>Escolha um dos casos abaixo e salva</Text>

            <FlatList
                data={incidents}
                style={ styles.incidentsList }
                keyExtractor={ incidents => String(incidents.id) }
                showsVerticalScrollIndicator={ false }
                onEndReached={ loadIncidents }
                onEndReachedThreshold={ 0.1 }
                renderItem={ ({ item: incident }) => (
                    <View style={ styles.incidents }>
                        <Text style={ styles.incidentsProperty }>ONG:</Text>
                        <Text style={ styles.incidentsValue }>{ incident.name }</Text>

                        <Text style={ styles.incidentsProperty }>CASO:</Text>
                        <Text style={ styles.incidentsValue }>{ incident.title }</Text>

                        <Text style={ styles.incidentsProperty }>VALOR:</Text>
                        <Text style={ styles.incidentsValue }>
                        {
                            Intl.NumberFormat(
                                'pt-BR', 
                                { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }
                            ).format(incident.value) 
                        }
                        </Text>

                        <TouchableOpacity
                            style={ styles.detailsButton }
                            onPress={ () => navigationDetail(incident) }
                        >
                            <Text style={ styles.detailsButtonText }>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View> 
                 ) }
            />
        </View>
    );
}