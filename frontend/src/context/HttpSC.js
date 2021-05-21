const url = 'http://localhost:8000/'

export async function get(path, token){
    let result = await fetch(url+path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    })
    if(result.status === 200)
        return Promise.resolve(result)
    return Promise.reject(result)
}

export async function post(path, data, token){
    let result = await fetch(url+path, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(data),
    })
    if(result.status === 200)
        return Promise.resolve(result)
    return Promise.reject(result)
}

export async function put(path, data, token){
    try{
        let result = await fetch(url+path, {
            method: 'put',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(data)
        })
        if(result.status === 200)
            return Promise.resolve(result)
        return Promise.reject(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export async function destroy(path, token){
    try {
        let result = await fetch(url+path, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        if(result.status === 200)
            return Promise.resolve(result)
        return Promise.reject(result)
    } catch(err){
        return Promise.reject(err)
    }
}