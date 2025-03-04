import React from 'react'
import { getAllSale, saleReport } from '@/api/manager/queries';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { col } from '@/modules/manager-page/chunks/column';

const ManagerView: React.FC = () => {
    const { data: sales, isFetching, isLoading, isError, error } = getAllSale.useQuery();
    const { data: sale } = saleReport.useQuery();

    return (
        <>
            <div className='p-4'>
                <h1 className='text-center font-bold'>Manager View</h1>

                <div className="container mx-auto">
                    <div className="flex justify-center">
                        {sale && (

                            <div className="card my-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md" style={{ width: "22rem" }}>
                                <div className="card-header mb-4 bg-blue-50 dark:bg-blue-800 p-3 rounded-lg">
                                    <span className="text-blue-600 dark:text-blue-300 font-bold">Total Revenue</span> :
                                    <span className="font-bold text-lg text-gray-700 dark:text-gray-100">{sale.totalPrice}</span>
                                </div>
                                <div className="card-header bg-green-50 dark:bg-green-800 p-3 rounded-lg">
                                    <span className="text-green-600 dark:text-green-300 font-bold">Total Profit</span> :
                                    <span className="font-bold text-lg text-gray-700 dark:text-gray-100">{sale.totalProfit}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {isFetching && <p className='text-center font-bold'>Loading...</p>}

                {/* Error State */}
                {isError && <p className='text-red-500 font-bold text-center'>Error: {error?.message}</p>}

                <DataTable columns={col} data={sales ?? []} loading={isLoading} />
            </div>
        </>
    )
}

export default ManagerView
