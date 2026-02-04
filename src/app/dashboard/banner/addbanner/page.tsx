"use client";

import { useState } from "react";
import { Button, Form, Upload, message, Alert, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddBanner: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]); // ✅ always array
  const [bannerId, setBannerId] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [form] = Form.useForm();

  const handlePreview = async (file: any) => {
    const src = file.url || URL.createObjectURL(file.originFileObj);
    const imgWindow = window.open(src);
    if (imgWindow) imgWindow.document.write(`<img src="${src}" />`);
  };

  const onFinish = async () => {
    if (!fileList || !fileList.length) return message.error("Please select at least one banner image");

    try {
      const formData = new FormData();

      // Append all images
      (fileList || []).forEach((file) => {
        if (file.originFileObj) formData.append("banners", file.originFileObj);
      });

      const title = form.getFieldValue("title");
      if (title) formData.append("title", title);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/addbanner`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setBannerId(data.banner._id);
        setAlertMessage("Banner uploaded successfully ✅");
        message.success("Banner uploaded successfully ✅");
        form.resetFields();
        setFileList([]);
      } else {
        setAlertMessage("Failed to upload banner ❌");
        message.error("Failed to upload banner ❌");
      }
    } catch (err) {
      console.error("Banner upload error:", err);
      message.error("Something went wrong ❌");
    }
  };

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} type="success" showIcon closable className="mb-4" />
      )}

      <Flex justify="center" style={{ padding: 40 }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{ width: 600 }}
          layout="vertical"
        >
          <Form.Item label="Banner Title" name="title">
            <input placeholder="Optional banner title" />
          </Form.Item>

          <Form.Item
            label="Upload Banners"
            name="banners"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              // ✅ ensure it's always an array
              if (Array.isArray(e)) return e;
              return e?.fileList || [];
            }}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              multiple
              beforeUpload={() => false} // prevent auto-upload
              onPreview={handlePreview}
              onChange={({ fileList: newList }) => setFileList(newList || [])}
              onRemove={(file) =>
                setFileList(fileList.filter((f) => f.uid !== file.uid))
              }
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Upload Banner
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default AddBanner;
