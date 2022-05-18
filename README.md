# Bitraf Door Opener

## Development

Type `wrangler dev` to start dev environment
 
Trigger worker using POST request:

```shell
curl --location --request POST 'http://127.0.0.1:8787' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=myuser' \
--data-urlencode 'password=mypass'
```

## Production

Type `wrangler publish` to publish worker to Cloudflare 

`wrangler tail`

https://bitraf-door-cloudflare-worker.mattis.workers.dev