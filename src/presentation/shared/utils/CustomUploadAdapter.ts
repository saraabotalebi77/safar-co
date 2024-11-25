import {  UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { Editor } from '@ckeditor/ckeditor5-core';


class MyUploadAdapter implements UploadAdapter {
    private loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload(): Promise<{ default: string }> {
        return this.loader.file
            .then((file: File) => {
                return new Promise<{ default: string }>((resolve, reject) => {
                    const data = new FormData();
                    data.append('upload', file);

                    fetch('https://safarcotrave.liara.run/api/auth/user/upload-image', {
                        method: 'POST',
                        body: data
                    })
                        .then(response => response.json())
                        .then((result: { data: string }) => {
                            
                            resolve({
                                default: result.data 
                            });
                        })
                        .catch((error: Error) => {
                            reject(error);
                        });
                });
            });
    }

    abort(): void {
    }
}

function MyCustomUploadAdapterPlugin(editor: Editor): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader);
    };
}

export default MyCustomUploadAdapterPlugin;
