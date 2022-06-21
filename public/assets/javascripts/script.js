$("#input-ficons-1").fileinput({
    uploadUrl: "/file-upload-batch/2",
    uploadAsync: true,
    previewFileIcon: '<i class="fas fa-file"></i>',
    allowedPreviewTypes: null, // set to empty, null or false to disable preview for all types
    previewFileIconSettings: {
        'docx': '<i class="fas fa-file-word text-primary"></i>',
        'xlsx': '<i class="fas fa-file-excel text-success"></i>',
        'pptx': '<i class="fas fa-file-powerpoint text-danger"></i>',
        'jpg': '<i class="fas fa-file-image text-warning"></i>',
        'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
        'zip': '<i class="fas fa-file-archive text-muted"></i>',
    }
});