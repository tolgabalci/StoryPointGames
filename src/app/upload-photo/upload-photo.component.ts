import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  selectedFile;
  
  constructor(private authService: AngularFireAuth, private fbApp: AngularFireDatabase) { }

  ngOnInit() {
  }

  onUploadFinished(event) {
    console.log("Finished");    
    console.log(event.file);    
    var fileName = this.selectedFile.name;
    var storageRef = this.fbApp.database.app.storage().ref('/profileImages/' + fileName);    
    var uploadTask = storageRef.put(this.selectedFile)
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, function (error) {
      // Handle unsuccessful uploads
      }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/..
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        
    }
  )
  }

  onUploadStateChanged(event) {
    this.selectedFile = event.file;
    console.log("state changed");    
  }
}
