import { Pipe, PipeTransform } from '@angular/core';
import { CommentModel } from '../../interfaces/comment-model';

@Pipe({
  name: 'dataConversion'
})
export class DataConversionPipe implements PipeTransform {

  transform(array: any[], id: string = 'id', parentId: string = 'parent_id', rootValue: any = null) {
    console.log(array);
    return this.filterComments(array, id, parentId, rootValue);
  }

  filterComments(array: any[], id: string, parentId: string, parentValue: any) {
    return array.filter((comment) => {
      return comment[parentId] === parentValue;
    }).map((comment) => {
      comment["comments"] = this.filterComments(array, id, parentId, comment[id]);
      return comment;
    });
  }

}
