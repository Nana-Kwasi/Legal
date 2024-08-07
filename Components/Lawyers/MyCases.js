import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCases } from '../Civilian/CaseContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const MyCases = () => {
    const { lawyerCases = [], cases } = useCases(); // Default to an empty array if lawyerCases is undefined
    const navigation = useNavigation();

    // Ensure lawyerCases is an array before calling map
    const takenCases = Array.isArray(lawyerCases) ? lawyerCases.map(caseId =>
        cases.find(c => c.id === caseId)
    ).filter(Boolean) : [];

    return (
        <View style={styles.container}>
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
        </View>
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
});

export default MyCases;

// import React, { useMemo } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useCases } from '../Civilian/CaseContext';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { PieChart, BarChart } from 'react-native-chart-kit';

// const MyCases = () => {
//     const { lawyerCases, cases } = useCases();
//     const navigation = useNavigation();

//     const takenCases = lawyerCases.map(caseId =>
//         cases.find(c => c.id === caseId)
//     ).filter(Boolean);

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };

//     const getCurrentMonthYear = () => {
//         const now = new Date();
//         return `${now.getMonth() + 1}-${now.getFullYear()}`;
//     };

//     const getMonthName = (monthIndex) => {
//         const date = new Date();
//         date.setMonth(monthIndex - 1); // monthIndex is 1-based, JavaScript months are 0-based
//         return date.toLocaleString('default', { month: 'long' });
//     };

//     const generateDatesForCases = (cases) => {
//         return cases.map((caseItem) => ({
//             ...caseItem,
//             date: new Date().toISOString().split('T')[0], // Assign current date to all cases
//         }));
//     };

//     const casesWithDates = generateDatesForCases(takenCases);
//     const currentMonthYear = getCurrentMonthYear();

//     const groupedCasesByMonthYear = useMemo(() => {
//         const groups = {};
//         casesWithDates.forEach(caseItem => {
//             const caseDate = new Date(caseItem.date);
//             const monthYear = `${caseDate.getMonth() + 1}-${caseDate.getFullYear()}`;
//             if (!groups[monthYear]) {
//                 groups[monthYear] = [];
//             }
//             groups[monthYear].push(caseItem);
//         });
//         return groups;
//     }, [casesWithDates]);

//     const currentMonthCases = groupedCasesByMonthYear[currentMonthYear] || [];

//     const pieChartData = useMemo(() => {
//         return Object.keys(groupedCasesByMonthYear).map(monthYear => {
//             const [month, year] = monthYear.split('-').map(Number);
//             const monthName = getMonthName(month);
//             const totalCases = groupedCasesByMonthYear[monthYear].length;
//             return {
//                 name: `${monthName} (${totalCases})`,
//                 count: totalCases,
//                 color: getRandomColor(),
//                 legendFontColor: '#7F7F7F',
//                 legendFontSize: 15,
//             };
//         });
//     }, [groupedCasesByMonthYear]);

//     const barChartData = useMemo(() => {
//         const labels = Object.keys(groupedCasesByMonthYear).sort((a, b) => {
//             const [aMonth, aYear] = a.split('-').map(Number);
//             const [bMonth, bYear] = b.split('-').map(Number);
//             return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
//         }).map(monthYear => {
//             const [month, year] = monthYear.split('-').map(Number);
//             return `${getMonthName(month)} ${year}`;
//         });

//         const data = Object.keys(groupedCasesByMonthYear).map(monthYear => {
//             return groupedCasesByMonthYear[monthYear].length;
//         });

//         return {
//             labels,
//             datasets: [
//                 {
//                     data,
//                     color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//                     strokeWidth: 2,
//                 },
//             ],
//         };
//     }, [groupedCasesByMonthYear]);

//     return (
//         <ScrollView style={styles.container}>
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

//             <Text style={styles.chartTitle}>Cases Distribution</Text>
//             <PieChart
//                 data={pieChartData}
//                 width={400}
//                 height={220}
//                 chartConfig={{
//                     backgroundColor: '#eaeaea',
//                     backgroundGradientFrom: '#eaeaea',
//                     backgroundGradientTo: '#eaeaea',
//                     decimalPlaces: 2,
//                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     style: {
//                         borderRadius: 16,
//                     },
//                 }}
//                 accessor="count"
//                 backgroundColor="transparent"
//                 paddingLeft="15"
//                 absolute
//             />
//             <Text style={styles.chartTitle}>Cases Over Time</Text>
//             <BarChart
//                 data={barChartData}
//                 width={400}
//                 height={220}
//                 chartConfig={{
//                     backgroundColor: '#eaeaea',
//                     backgroundGradientFrom: '#eaeaea',
//                     backgroundGradientTo: '#eaeaea',
//                     decimalPlaces: 2,
//                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     style: {
//                         borderRadius: 16,
//                     },
//                     propsForDots: {
//                         r: "6",
//                         strokeWidth: "2",
//                         stroke: "#ffa726",
//                     },
//                 }}
//                 showBarTops
//                 showValuesOnTopOfBars
//             />
//         </ScrollView>
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
//         elevation: 10,
//     },
//     caseTitle: {
//         fontSize: 16,
//         color: '#333',
      
//     },
//     caseDetails: {
//         fontSize: 16,
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
//     chartTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginVertical: 20,
//         textAlign: 'center',
//     },
// });

// export default MyCases;