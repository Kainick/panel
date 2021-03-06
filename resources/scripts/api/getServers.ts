import { rawDataToServerObject, Server } from '@/api/server/getServer';
import http, { getPaginationSet, PaginatedResult } from '@/api/http';

export default (query?: string, includeAdmin?: boolean): Promise<PaginatedResult<Server>> => {
    return new Promise((resolve, reject) => {
        http.get('/api/client', {
            params: {
                include: [ 'allocation' ],
                type: includeAdmin ? 'all' : undefined,
                'filter[name]': query,
            },
        })
            .then(({ data }) => resolve({
                items: (data.data || []).map((datum: any) => rawDataToServerObject(datum)),
                pagination: getPaginationSet(data.meta.pagination),
            }))
            .catch(reject);
    });
};
