addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function login(username, password) {
  var requestOptions = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({'username': username, 'password': password}),
    redirect: 'follow'
  };

  const url = "https://p2k16.bitraf.no/service/authz/log-in"

  const response = await fetch(url, requestOptions);
  const cookie = await extractCookie(response);
  
  return cookie;
}


async function extractCookie(response) {
  const { headers } = response;
  return headers.get('set-cookie')
}


async function openDoor( cookie ) {
  var raw = "{\"doors\":[\"bv9-f2-entrance\"]}";

  var requestOptions = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'cookie': cookie
    },
    body: raw,
    redirect: 'follow'
  };

  const url = "https://p2k16.bitraf.no/service/door/open"

  const response = await fetch(url, requestOptions);
  console.log( response )
}


async function readForm( request ) {
  const { headers } = request;
  const contentType = headers.get('content-type') || '';

  const body = {};

  if (contentType.includes('form')) {
    const formData = await request.formData();
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
  }

  return body
}


function respondJson( data ) {
  const json = JSON.stringify(data, null, 2);

  return new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}


async function handleRequest(request) {
  if (request.method === 'POST') {
    const formData = await readForm( request )
    console.log( formData )

    const cookie = await login(formData.username, formData.password)
    await openDoor( cookie )

    return respondJson( {'status': 'open'} )

  } else {
    return new Response('GET out of here')
  }
}
