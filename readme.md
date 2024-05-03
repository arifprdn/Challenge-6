ENDPOINT 

1. upload gambar
POST /upload

multipart

{
    file,
    title,
    description
}

2. lihat semua gambar
GET /

3. lihat gambar by id
GET /:id

4. delete gambar by id
DELETE /delete/:id

5. edit title dan description
PUT /edit/:id