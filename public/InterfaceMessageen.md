## Interface list

### /mec/appstore/v1/messages
### POST
Add message
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|dto | path |Y| String | MessageReqDto |

#### Request code

    try {
                MessagePo messagePo = messageMapper.getOneMessage(message.getMessageId());
                if (messagePo != null) {
                    LOGGER.error("message {} has existed", message.getMessageId());
                    throw new DomainException(String.format("message %s has existed", message.getMessageId()));
                }
                messageMapper.insert(MessagePo.of(message));
            } catch (Exception e) {
                LOGGER.error("add message to db error: {}", e.getMessage());
                throw new DomainException("db operate error");
            }


#### Request parameter MessageReqDto
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|BasicMessageInfo | path |Y| Object | Basic Information |
|sourceAppStore | path |Y| String | source app store |
|targetAppStore | path |Y| String | Target app store |
|atpTestStatus | path |Y| String | atp test status |
|atpTestTaskId | path |Y| String | atp test task id |
|atpTestReportUrl | path |Y| String | atp test path |
|packageDownloadUrl | path |Y| String | Application package download path |
|iconDownloadUrl | path |Y| String | Icon download path |

#### Request parameter BasicMessageInfo
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|name | path |Y| String | Attribute |
|provider | path |Y| String | Name |
|version | path |Y| String | Version |
|affinity | path |Y| String | Affinity |
|shortDesc | path |Y| String | Description |
|industry | path |Y| String | Industry |
|type | path |Y| String | Type |

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|500 | Resource grant error |