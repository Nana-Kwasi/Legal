// import React from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { useCases } from '../Civilian/CaseContext';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const MyCases = () => {
//     const { lawyerCases, cases } = useCases();
//     const navigation = useNavigation();

//     const takenCases = lawyerCases.map(caseId =>
//         cases.find(c => c.id === caseId)
//     ).filter(Boolean);

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                 <MaterialIcons name="arrow-back" size={34} color="#000" />
//             </TouchableOpacity>
//             <Text style={styles.backButtonText}>YOUR CASES</Text>

//             <FlatList
//                 data={takenCases}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.caseCard}>
//                         <Text style={styles.caseTitle}>{item.issues}</Text>
//                         <Text style={styles.caseDetails}>{item.taken ? 'Taken' : 'Taken by you'}</Text>
                        
//                     </View>
//                 )}
//                 ListEmptyComponent={
//                     <View style={styles.emptyContainer}>
//                         <Text style={styles.emptyText}>No cases taken yet.</Text>
//                     </View>
//                 }
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#eaeaea',
//         padding: 20,
//     },
//     caseCard: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 12,
//         marginBottom: 15,
//         elevation: 3,
//     },
//     caseTitle: {
//         fontSize: 18,
//         color: '#333',
//     },
//     caseDetails: {
//         fontSize: 16,
//         color: '#666',
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: 'red',
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     emptyText: {
//         fontSize: 16,
//         color: '#888',
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 100,
//         marginBottom: 20,
//     },
//     backButtonText: {
//         fontSize: 18,
//         marginLeft: 90,
//         marginBottom: 20,
//         fontWeight: 'bold',
//     },
// });

// export default MyCases;


import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCases } from '../Civilian/CaseContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { PieChart, LineChart } from 'react-native-chart-kit';

const MyCases = () => {
    const { lawyerCases, cases } = useCases();
    const navigation = useNavigation();

    const takenCases = lawyerCases.map(caseId =>
        cases.find(c => c.id === caseId)
    ).filter(Boolean);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getCurrentMonthYear = () => {
        const now = new Date();
        return `${now.getMonth() + 1}-${now.getFullYear()}`;
    };

    const generateDatesForCases = (cases) => {
        const currentDate = new Date();
        return cases.map((caseItem, index) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - index);
            return {
                ...caseItem,
                date: date.toISOString().split('T')[0] // Store date in YYYY-MM-DD format
            };
        });
    };

    const casesWithDates = generateDatesForCases(takenCases);
    const currentMonthYear = getCurrentMonthYear();

    const groupedCasesByMonthYear = useMemo(() => {
        const groups = {};
        casesWithDates.forEach(caseItem => {
            const caseDate = new Date(caseItem.date);
            const monthYear = `${caseDate.getMonth() + 1}-${caseDate.getFullYear()}`;
            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            groups[monthYear].push(caseItem);
        });
        return groups;
    }, [casesWithDates]);

    const currentMonthCases = groupedCasesByMonthYear[currentMonthYear] || [];

    const pieChartData = useMemo(() => {
        const totalCases = currentMonthCases.length;
        const data = [
            { name: 'Current Month Cases', count: totalCases, color: getRandomColor(), legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ];
        return [...data, { name: `Total: ${totalCases}`, count: totalCases, color: '#FFF', legendFontColor: '#000', legendFontSize: 15 }];
    }, [currentMonthCases]);

    const lineChartData = useMemo(() => {
        const labels = Object.keys(groupedCasesByMonthYear).sort((a, b) => {
            const [aMonth, aYear] = a.split('-').map(Number);
            const [bMonth, bYear] = b.split('-').map(Number);
            return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
        });

        const data = labels.map(monthYear => groupedCasesByMonthYear[monthYear].length);

        return {
            labels,
            datasets: [
                {
                    data,
                    strokeWidth: 2,
                },
            ],
        };
    }, [groupedCasesByMonthYear]);

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={34} color="#000" />
            </TouchableOpacity>
            <Text style={styles.backButtonText}>YOUR CASES</Text>

            <FlatList
                data={takenCases}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.caseCard}>
                        <Text style={styles.caseTitle}>{item.issues}</Text>
                        <Text style={styles.caseDetails}>{item.taken ? 'Taken' : 'Taken by you'}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No cases taken yet.</Text>
                    </View>
                }
            />

            <Text style={styles.chartTitle}>Cases Distribution</Text>
            <PieChart
                data={pieChartData}
                width={400}
                height={220}
                chartConfig={{
                    backgroundColor: '#eaeaea',
                    backgroundGradientFrom: '#eaeaea',
                    backgroundGradientTo: '#eaeaea',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            <Text style={styles.chartTitle}>Cases Over Time</Text>
            <LineChart
                data={lineChartData}
                width={400}
                height={220}
                chartConfig={{
                    backgroundColor: '#eaeaea',
                    backgroundGradientFrom: '#eaeaea',
                    backgroundGradientTo: '#eaeaea',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                    },
                }}
                bezier
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        padding: 20,
    },
    caseCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },
    caseTitle: {
        fontSize: 18,
        color: '#333',
    },
    caseDetails: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
        marginTop: 10,
        color: 'red',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 18,
        marginLeft: 90,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
});

export default MyCases;
